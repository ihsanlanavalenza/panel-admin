// server/api/admin/users/[id].delete.ts
import { requirePermission } from '../../../utils/guard'
import { User } from '../../../models/User'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'users:delete')
  const id = getRouterParam(event, 'id') as string
  await User.findByIdAndDelete(id)
  return { success: true }
})
