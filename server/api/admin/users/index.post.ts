// server/api/admin/users/index.post.ts
import { requirePermission } from '../../../utils/guard'
import { User } from '../../../models/User'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:create')
  const body = await readBody(event)
  const { username, email, password, fullName, role = 'ATC', status = 'ACTIVE' } = body
  if (!username || !email || !password || !fullName) throw createError({ statusCode: 400 })
  const passwordHash = await bcrypt.hash(password, 12)
  const user = await User.create({ username, email, passwordHash, fullName, role, status })
  const { passwordHash: _, ...safe } = user.toObject()
  return { user: safe }
})
