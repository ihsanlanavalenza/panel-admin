import { requirePermission } from '../../utils/guard'

export default defineEventHandler(async (event) => {
  await requirePermission(event, 'analytics:read')
  const body = await readBody(event)
  // TODO integrate real analytics; return mock for now
  return { count: Math.floor(Math.random() * 20) + 1, zoneId: body?.zoneId || null }
})
