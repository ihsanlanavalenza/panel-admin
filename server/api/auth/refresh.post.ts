// server/api/auth/refresh.post.ts
import { verify, generateTokens, hashToken, setRefreshCookie } from '../../utils/jwt'
import { RefreshToken } from '../../models/RefreshToken'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refreshToken')
  if (!refreshToken) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const payload = verify(refreshToken, true)
  if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const tokenHash = hashToken(refreshToken)
  const dbToken = await RefreshToken.findOne({ tokenHash })
  if (!dbToken || dbToken.expiresAt < new Date()) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const { accessToken, refreshToken: newRefreshToken } = generateTokens((payload as any).userId)
  const newHash = hashToken(newRefreshToken)
  dbToken.tokenHash = newHash
  dbToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  await dbToken.save()
  setRefreshCookie(event, newRefreshToken, 7)
  return { accessToken }
})
