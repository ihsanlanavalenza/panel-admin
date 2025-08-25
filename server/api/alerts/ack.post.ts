import { requirePermission } from '../../utils/guard'
import { Alert } from '../../models/Alert'

export default defineEventHandler(async (event) => {
  const user = await requirePermission(event, 'alerts:ack')
  const { id } = await readBody(event)
  const doc = await Alert.findByIdAndUpdate(id, { status: 'ACK', ackBy: (user as any)._id }, { new: true })
  return { ok: !!doc }
})
