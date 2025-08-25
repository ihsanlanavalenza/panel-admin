export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
  // FIX: Register Pinia via Nuxt module for SSR/CSR
  '@pinia/nuxt'
  ],
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  
  runtimeConfig: {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-jwt-key-change-in-production',
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || 'your-secret-jwt-key-change-in-production',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  mongoUri: process.env.MONGO_URI || '',
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    compatibilityDate: '2025-08-21'
  },
  
  app: {
    head: {
      title: 'AIRNAV - Indonesian Airspace Surveillance System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Indonesian Airspace Surveillance System - Admin Panel' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
