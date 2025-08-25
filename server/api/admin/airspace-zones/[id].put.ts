// server/api/admin/airspace-zones/[id].put.ts
import { requirePermission } from '../../../utils/guard'
import { AirspaceZone } from '../../../models/AirspaceZone'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'datasets:write')
  const id = getRouterParam(event, 'id') as string
  const body = await readBody(event)
  const zone = await AirspaceZone.findByIdAndUpdate(id, body, { new: true })
  if (!zone) throw createError({ statusCode: 404 })
  return { zone }
})
