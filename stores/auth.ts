import { defineStore } from 'pinia'

interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'ATC'
  status: 'ACTIVE' | 'SUSPENDED'
}

interface LoginRequest {
  usernameOrEmail: string
  password: string
  captchaId: string
  captchaAnswer: string
  rememberMe: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: null as string | null,
    loading: false,
  error: null as string | null,
  permissions: [] as import('~/utils/permissions').Permission[]
  }),

  getters: {
  isAuthenticated: (state) => !!state.user && !!state.accessToken,
  can: (state) => (perm: import('~/utils/permissions').Permission) => state.permissions.includes(perm)
  },

  actions: {
    async login({ usernameOrEmail, password, captchaId, captchaAnswer, rememberMe }: LoginRequest) {
      this.loading = true
      this.error = null
      
      try {
        const data: any = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { usernameOrEmail, password, captchaId, captchaAnswer, rememberMe }
        })
        
        if (data) {
          this.user = data.user
          this.accessToken = data.accessToken
          // compute permissions from role
          try {
            const mod = await import('~/utils/permissions')
            // @ts-ignore
            this.permissions = mod.permissionsForRole(data.user?.role)
          } catch {}
          
          // Store token in cookie
          const token = useCookie('accessToken', {
            default: () => null,
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days or 1 day
          })
          token.value = data.accessToken
          
          return { success: true, user: data.user }
        }
        
        throw new Error('No data received')
      } catch (e: any) {
        console.error('Login error:', e)
        this.error = e.data?.message || e.message || 'Invalid credentials'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      try {
        await $fetch('/api/auth/logout', { method: 'POST' })
      } catch (e) {
        console.error('Logout error:', e)
      } finally {
        this.user = null
        this.accessToken = null
        
        // Clear cookie
        const token = useCookie('accessToken')
        token.value = null
        
        // Redirect to login
        await navigateTo('/login')
      }
    },

    async checkAuth() {
      const token = useCookie('accessToken')
      if (!token.value) return false

      try {
        const data: any = await $fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token.value}` }
        })
        
        if (data && data.user) {
          this.user = data.user
          this.accessToken = token.value
          try {
            const mod = await import('~/utils/permissions')
            // @ts-ignore
            this.permissions = mod.permissionsForRole(data.user?.role)
          } catch {}
          return true
        } else {
          throw new Error('No user data')
        }
      } catch (e) {
        console.error('Auth check error:', e)
  this.user = null
        this.accessToken = null
  this.permissions = []
        
        // Clear invalid cookie
        const tokenCookie = useCookie('accessToken')
        tokenCookie.value = null
        
        return false
      }
    },

    async refreshToken() {
      try {
        const data: any = await $fetch('/api/auth/refresh', { method: 'POST' })
        
        if (data && data.accessToken) {
          this.accessToken = data.accessToken
          
          // Update cookie
          const token = useCookie('accessToken')
          token.value = data.accessToken
          
          return true
        }
        
        return false
      } catch (e) {
        console.error('Failed to refresh token:', e)
        return false
      }
    },

    clearError() {
      this.error = null
    }
  }
})

// Type exports
export type { User, LoginRequest }
