import { requirePermission } from '../../utils/guard'
import { Alert } from '../../models/Alert'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'alerts:read')
  const q = getQuery(event)
  const where: any = {}
  if (q.status) where.status = q.status
  return await Alert.find(where).sort({ createdAt: -1 }).limit(200)
})
