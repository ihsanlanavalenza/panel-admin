// server/api/status/sdf.get.ts
export default defineEventHandler(() => {
  return {
    system: 'SDF',
    status: 'OK',
    timestamp: new Date().toISOString()
  }
})
