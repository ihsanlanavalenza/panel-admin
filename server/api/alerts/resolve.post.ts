import { requirePermission } from '../../utils/guard'
import { Alert } from '../../models/Alert'

export default defineEventHandler(async (event) => {
  const user = await requirePermission(event, 'alerts:resolve')
  const { id } = await readBody(event)
  const doc = await Alert.findByIdAndUpdate(id, { status: 'RESOLVED', resolveBy: (user as any)._id }, { new: true })
  return { ok: !!doc }
})
