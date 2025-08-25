// server/api/admin/airspace-zones/index.post.ts
import { requirePermission } from '../../../utils/guard'
import { AirspaceZone } from '../../../models/AirspaceZone'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'datasets:write')
  const body = await readBody(event)
  const { name, center, radiusKm, capacity, status } = body
  if (!name || !center || typeof center.lat !== 'number' || typeof center.lng !== 'number') throw createError({ statusCode: 400 })
  const zone = await AirspaceZone.create({ name, center, radiusKm, capacity, status })
  return { zone }
})
