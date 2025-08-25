export default defineNuxtRouteMiddleware((to) => {
  // Check authentication status
  const token = useCookie('accessToken')
  
  if (!token.value) {
    return navigateTo('/login')
  }
})
