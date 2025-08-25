export default defineNuxtRouteMiddleware(async () => {
  const token = useCookie('accessToken')
  
  if (!token.value) {
    return navigateTo('/login')
  }
  
  try {
    const data: any = await $fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token.value}` }
    })
    
    if (!data || data.user?.role !== 'SUPER_ADMIN') {
      return navigateTo('/login')
    }
  } catch (e) {
    console.error('Admin middleware error:', e)
    return navigateTo('/login')
  }
})
