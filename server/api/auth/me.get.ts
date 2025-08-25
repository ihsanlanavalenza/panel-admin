// server/api/auth/me.get.ts
import { verify } from '../../utils/jwt'
import { User } from '../../models/User'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const token = auth.replace('Bearer ', '')
  const payload = verify(token)
  if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const user = await User.findById((payload as any).userId)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const { passwordHash, ...userSafe } = user.toObject()
  return { user: userSafe }
})
