// Nuxt plugin example: using a store outside components via the active Pinia instance
// This is a safe pattern for SSR because we access pinia from nuxtApp and avoid top-level store calls.
import { useAuthStore } from '@/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = (nuxtApp as any).$pinia || (nuxtApp as any).pinia
  if (!pinia) return
  // Optional: access router if needed (client-side)
  const router = (nuxtApp as any).$router

  // Example (disabled): install a guard using the store instance
  // if (router) {
  //   router.beforeEach((to, from, next) => {
  //     const auth = useAuthStore(pinia)
  //     // Add your logic here (e.g., check auth for admin routes)
  //     next()
  //   })
  // }

  // Touch the store lazily to validate availability without changing behavior
  try {
    // Do not create side effects; just ensure this pattern is valid.
    void useAuthStore(pinia)
  } catch {
    // Ignore if not available; Nuxt will still initialize it for components
  }
})
