export default defineNuxtRouteMiddleware(async (to) => {
  const required = (to.meta?.requiredPermissions as string[] | undefined) || []
  if (!required.length) return
  const { useAuthStore } = await import('~/stores/auth')
  const store = useAuthStore()
  try { if (!store.user) await store.checkAuth() } catch {}
  const ok = required.every(p => (store as any).permissions?.includes(p as any))
  if (!ok) return navigateTo('/403')
})
