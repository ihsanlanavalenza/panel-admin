// server/api/admin/users/index.get.ts
import { requirePermission } from '../../../utils/guard'
import { User } from '../../../models/User'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:read')
  const users = await User.find().select('-passwordHash')
  return { users }
})
