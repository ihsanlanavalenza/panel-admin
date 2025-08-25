// server/api/admin/airspace-zones/[id].delete.ts
import { requirePermission } from '../../../utils/guard'
import { AirspaceZone } from '../../../models/AirspaceZone'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'datasets:write')
  const id = getRouterParam(event, 'id') as string
  await AirspaceZone.findByIdAndDelete(id)
  return { success: true }
})
