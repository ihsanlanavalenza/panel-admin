// server/api/auth/logout.post.ts
import { RefreshToken } from '../../models/RefreshToken'

export default defineEventHandler(async (event) => {
  const refreshToken = getCookie(event, 'refreshToken')
  if (refreshToken) {
  const { hashToken } = await import('../../utils/jwt')
  await RefreshToken.deleteMany({ tokenHash: hashToken(refreshToken) })
    setCookie(event, 'refreshToken', '', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
    })
  }
  return { success: true }
})
