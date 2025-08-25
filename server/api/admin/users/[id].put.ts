// server/api/admin/users/[id].put.ts
import { requirePermission } from '../../../utils/guard'
import { User } from '../../../models/User'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:update')
  const id = getRouterParam(event, 'id') as string
  const body = await readBody(event)
  const { fullName, role, status } = body
  const user = await User.findByIdAndUpdate(id, { $set: { fullName, role, status } }, { new: true })
  if (!user) throw createError({ statusCode: 404 })
  const { passwordHash: _, ...safe } = user.toObject()
  return { user: safe }
})
