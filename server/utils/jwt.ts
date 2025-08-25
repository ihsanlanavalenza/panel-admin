// server/utils/jwt.ts
import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import type { H3Event } from 'h3'

export function getJwtSecrets() {
  const config = useRuntimeConfig()
  const JWT_SECRET = (config as any).jwtSecret || process.env.JWT_SECRET || 'secret'
  const JWT_REFRESH_SECRET = (config as any).jwtRefreshSecret || process.env.JWT_REFRESH_SECRET || JWT_SECRET
  const JWT_EXPIRES_IN = (config as any).jwtExpiresIn || process.env.JWT_EXPIRES_IN || '24h'
  const JWT_REFRESH_EXPIRES_IN = (config as any).jwtRefreshExpiresIn || process.env.JWT_REFRESH_EXPIRES_IN || '7d'
  return { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN }
}

export function generateTokens(userId: string | number, rememberMe = false) {
  const { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = getJwtSecrets()
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
  const refreshToken = jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: rememberMe ? '30d' : JWT_REFRESH_EXPIRES_IN }
  )
  return { accessToken, refreshToken }
}

export function verify(token: string, refresh = false) {
  try {
    const { JWT_SECRET, JWT_REFRESH_SECRET } = getJwtSecrets()
    return jwt.verify(token, refresh ? JWT_REFRESH_SECRET : JWT_SECRET)
  } catch {
    return null
  }
}

export function extractUserFromToken(token: string) {
  const payload = verify(token)
  if (payload && typeof payload === 'object' && 'userId' in payload) {
    return (payload as any).userId as string | number
  }
  return null
}

export function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

export function setRefreshCookie(event: H3Event, token: string, maxAgeDays: number) {
  setCookie(event, 'refreshToken', token, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeDays * 24 * 60 * 60,
    path: '/',
  })
}
