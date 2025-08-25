// server/api/admin/airspace-zones/index.get.ts
import { requirePermission } from '../../../utils/guard'
import { AirspaceZone } from '../../../models/AirspaceZone'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'datasets:read')
  const zones = await AirspaceZone.find()
  return { zones }
})
