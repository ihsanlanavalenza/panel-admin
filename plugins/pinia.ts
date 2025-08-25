import { createPinia } from 'pinia'

// FIX: Ensure active Pinia in case @pinia/nuxt is missing; safe no-op if module already installed
export default defineNuxtPlugin((nuxtApp) => {
  const alreadyHasPinia = (nuxtApp as any).$pinia || (nuxtApp as any).pinia
  if (alreadyHasPinia) return

  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
  ;(nuxtApp as any).pinia = pinia
})
