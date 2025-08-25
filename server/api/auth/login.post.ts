// server/api/auth/login.post.ts
import { verifyCaptcha } from './captcha.get'
import { generateTokens, hashToken, setRefreshCookie } from '../../utils/jwt'
import { isLocked, incLoginAttempts, resetLoginAttempts } from '../../utils/auth'
import { User } from '../../models/User'
import { RefreshToken } from '../../models/RefreshToken'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { usernameOrEmail, password, captchaId, captchaAnswer, rememberMe } = body
  if (!usernameOrEmail || !password || !captchaId || captchaAnswer === undefined) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
  }
  if (!verifyCaptcha(captchaId, Number(captchaAnswer))) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
  }
  const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
  if (!user) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
  }
  if (await isLocked(user)) {
    throw createError({ statusCode: 403, statusMessage: 'Invalid credentials' })
  }
  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    await incLoginAttempts(user)
    throw createError({ statusCode: 400, statusMessage: 'Invalid credentials' })
  }
  await resetLoginAttempts(user)
  await User.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } })
  const { accessToken, refreshToken } = generateTokens(String(user._id), rememberMe)
  const tokenHash = hashToken(refreshToken)
  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    expiresAt: new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000),
  })
  setRefreshCookie(event, refreshToken, rememberMe ? 30 : 7)
  const { passwordHash, ...userSafe } = user.toObject()
  return { user: userSafe, accessToken }
})
