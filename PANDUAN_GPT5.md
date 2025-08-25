# 🤖 PANDUAN LENGKAP UNTUK GPT-5: MEMBANGUN APLIKASI VUE YANG BENAR

## 📋 EXECUTIVE SUMMARY UNTUK AI DEVELOPMENT

### 🎯 Context Project
**Project Name**: Indonesian Airspace Surveillance System - Admin Panel  
**Framework Stack**: Nuxt 3.4.0 + Vue 3 + Tailwind v4 + Prisma + MySQL  
**Development Status**: ✅ SIAP UNTUK PENGEMBANGAN LANJUTAN  
**Current State**: Struktur dasar lengkap, authentication system aktif, UI modern dengan glassmorphism

---

## 🏗️ ARCHITECTURE BLUEPRINT UNTUK GPT-5

### 1. KONFIGURASI INTI YANG SUDAH BENAR ✅

#### A. nuxt.config.ts - WAJIB DIPERTAHANKAN
```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  
  // CRITICAL: App head configuration  
  app: {
    head: {
      title: 'AIRNAV - Indonesian Airspace Surveillance System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Indonesian Airspace Surveillance System - Admin Panel' }
      ]
    }
  },
  
  // IMPORTANT: PostCSS untuk Tailwind v4
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  
  // JWT configuration
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'
  }
})
```

#### B. package.json - Dependencies yang TIDAK BOLEH DIUBAH
```json
{
  "dependencies": {
    "@pinia/nuxt": "^3.0.3",
    "@prisma/client": "^6.14.0", 
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "pinia": "^3.0.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.11",
    "nuxt": "^4.0.3",
    "tailwindcss": "^4.1.11",
    "prisma": "^6.14.0"
  }
}
```

### 2. VUE 3 COMPOSITION API PATTERNS - WAJIB DIIKUTI ⚡

#### A. Template Structure yang BENAR:
```vue
<template>
  <div class="container-class">
    <!-- SELALU gunakan v-if/v-for dengan key yang proper -->
    <div v-if="loading" class="loading-state">...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div v-else class="content">
      <!-- Main content here -->
    </div>
  </div>
</template>

<script setup lang="ts">
// ✅ BENAR: Nuxt 3 Composition API Style
import { useAuthStore } from '~/stores/auth'

// Metadata dengan useHead()
useHead({
  title: 'Page Title - AIRNAV Indonesia'
})

// Reactive state
const loading = ref(false)
const error = ref<string | null>(null)
const data = reactive({
  // reactive object properties
})

// Store usage
const authStore = useAuthStore()

// Lifecycle hooks
onMounted(() => {
  // initialization code
})

// Methods
const handleAction = async () => {
  loading.value = true
  try {
    // async operations
  } catch (e) {
    error.value = 'Error message'
  } finally {
    loading.value = false
  }
}
</script>
```

#### B. PINIA Store Pattern yang BENAR:
```typescript
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  // ✅ Gunakan Options API untuk Pinia (lebih stabil)
  state: () => ({
    user: null as User | null,
    accessToken: null as string | null,
    loading: false,
    error: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user && !!state.accessToken
  },

  actions: {
    async login(credentials: LoginRequest) {
      this.loading = true
      // async implementation
    }
  }
})
```

### 3. CSS SYSTEM ARCHITECTURE 🎨

#### A. Global CSS Structure di app.vue:
```vue
<style>
/* ✅ CSS Custom Properties - WAJIB DIPERTAHANKAN */
:root {
  --primary-blue: #1e40af;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

/* ✅ Glassmorphism Classes - CORE UI SYSTEM */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* ✅ Form Components - REUSABLE */
.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300;
}

.btn-primary {
  @apply w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl;
}
</style>
```

#### B. Tailwind Configuration - TIDAK BOLEH DIUBAH:
```javascript
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./app.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#2563eb',
          700: '#1d4ed8', 
          800: '#1e40af'
        }
      }
    }
  }
}
```

### 4. DATABASE & API ARCHITECTURE 🗄️

#### A. Prisma Schema - SUDAH FINAL:
```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  password  String
  fullName  String
  role      Role     @default(ATC)
  status    Status   @default(ACTIVE)
  loginAttempts Int   @default(0)
  lastLogin DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  SUPER_ADMIN
  ATC
}

enum Status {
  ACTIVE
  LOCKED
}
```

#### B. API Route Pattern - server/api/auth/login.post.ts:
```typescript
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    // Validation
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: body.usernameOrEmail },
          { email: body.usernameOrEmail }
        ]
      }
    })

    // Password verification dengan bcrypt
    const isValidPassword = await bcrypt.compare(body.password, user.password)
    
    // JWT generation
    const accessToken = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '1d' }
    )

    return {
      success: true,
      data: { user, accessToken }
    }

  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid credentials'
    })
  }
})
```

---

## 🚀 PEDOMAN PENGEMBANGAN UNTUK GPT-5

### ⚠️ ATURAN WAJIB - JANGAN DILANGGAR:

1. **SELALU gunakan Composition API** - Jangan pakai Options API untuk components
2. **SELALU gunakan useHead()** untuk metadata - Jangan pakai head() function
3. **SELALU gunakan $fetch()** untuk API calls - Jangan pakai axios
4. **SELALU gunakan navigateTo()** untuk routing - Jangan pakai $router.push()
5. **SELALU gunakan useCookie()** untuk cookies - Jangan pakai document.cookie
6. **SELALU gunakan reactive()/ref()** untuk state - Jangan pakai data()
7. **SELALU gunakan glassmorphism CSS classes** - Konsistensi UI theme

### ✅ PATTERN YANG SUDAH BENAR - IKUTI INI:

#### Authentication Flow:
```vue
<script setup lang="ts">
const authStore = useAuthStore()
const formData = reactive({
  usernameOrEmail: '',
  password: '',
  captchaAnswer: '',
  rememberMe: false
})

const handleLogin = async () => {
  const result = await authStore.login(formData)
  if (result.success) {
    await navigateTo('/admin/dashboard')
  }
}
</script>
```

#### Page Protection:
```vue
<script setup lang="ts">
// ✅ BENAR: Middleware protection
definePageMeta({
  middleware: 'auth'
})
</script>
```

#### State Management:
```vue
<script setup lang="ts">
// ✅ BENAR: Reactive state dengan proper typing
const statistics = ref([
  { title: 'Total Penerbangan', value: '1,245', change: '+12.5%' }
])

// ✅ BENAR: Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
</script>
```

### 🎯 COMPONENT PATTERNS YANG DISARANKAN:

#### 1. Form Components:
```vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <input v-model="form.field" class="form-input" placeholder="Placeholder">
    </div>
    <button type="submit" class="btn-primary" :disabled="loading">
      <span v-if="loading">Loading...</span>
      <span v-else>Submit</span>
    </button>
  </form>
</template>
```

#### 2. Dashboard Cards:
```vue
<template>
  <div class="glass rounded-xl p-6 slide-up">
    <h3 class="text-lg font-semibold text-white mb-4">Card Title</h3>
    <div class="content">
      <!-- Card content -->
    </div>
  </div>
</template>
```

#### 3. Statistics Display:
```vue
<template>
  <div class="stats-grid">
    <div v-for="stat in statistics" :key="stat.title" class="glass rounded-xl p-6">
      <p class="text-white/60 text-sm">{{ stat.title }}</p>
      <p class="text-3xl font-bold text-white mt-2">{{ stat.value }}</p>
      <p class="text-green-400 text-sm mt-1">{{ stat.change }}</p>
    </div>
  </div>
</template>
```

---

## 🔧 DEBUGGING & TROUBLESHOOTING GUIDE

### Common Issues & Solutions:

1. **"Cannot find name 'ref'"** 
   - ✅ Solution: Pastikan `import { ref } from 'vue'` atau gunakan auto-import Nuxt 3

2. **"useCookie is not defined"**
   - ✅ Solution: useCookie auto-imported di Nuxt 3, pastikan di context yang benar

3. **"Blank white page"**
   - ✅ Solution: Periksa structure component, pastikan <template> ada content

4. **"hydration mismatch"**  
   - ✅ Solution: Gunakan `process.client` untuk client-only code

5. **"Module not found"**
   - ✅ Solution: Pastikan paths di tsconfig.json benar

### Performance Tips:
- Gunakan `lazy` loading untuk components besar
- Implement proper loading states
- Use `readonly()` untuk state yang tidak berubah
- Optimize images dan assets

---

## 📊 CURRENT PROJECT STATUS

### ✅ IMPLEMENTED & WORKING:
- [x] Nuxt 3 setup dengan auto-imports
- [x] Vue 3 Composition API di semua components
- [x] Tailwind CSS v4 dengan glassmorphism
- [x] Pinia store dengan proper typing
- [x] JWT authentication system
- [x] Prisma database integration
- [x] Route protection middleware
- [x] Responsive dashboard dengan real-time data
- [x] Professional UI dengan animations
- [x] Security features (lockout, bcrypt, etc.)

### 🚀 READY FOR EXPANSION:
- [ ] Additional components library
- [ ] Advanced dashboard widgets
- [ ] File upload system  
- [ ] Real aviation data integration
- [ ] Advanced charts & visualizations
- [ ] User management interface
- [ ] Audit logging system
- [ ] Email notifications
- [ ] API documentation
- [ ] Testing suite

---

## 🎯 FINAL INSTRUCTIONS FOR GPT-5

### KETIKA MEMBANGUN FITUR BARU:

1. **SELALU mulai dengan setup Composition API yang benar**
2. **GUNAKAN existing CSS classes untuk konsistensi**
3. **IKUTI pattern yang sudah ada di pages/login.vue dan pages/admin/dashboard.vue**
4. **IMPLEMENTASIKAN proper error handling dan loading states**
5. **PASTIKAN responsive design dengan Tailwind utilities**
6. **GUNAKAN TypeScript interfaces untuk type safety**
7. **TEST di browser sebelum menganggap selesai**

### STRUKTUR FILE YANG DISARANKAN:
```
components/
├── ui/                  # Basic UI components
│   ├── Button.vue
│   ├── Input.vue  
│   └── Card.vue
├── forms/               # Form components
│   ├── LoginForm.vue
│   └── UserForm.vue
└── dashboard/           # Dashboard specific
    ├── StatCard.vue
    ├── ActivityFeed.vue
    └── QuickActions.vue
```

### DEVELOPMENT COMMANDS:
```bash
npm run dev              # Start development server
npx prisma studio        # Open database GUI
npx prisma db seed       # Seed default data
npm run build           # Build for production
```

---

## 💎 KEY SUCCESS FACTORS

1. **Consistency**: Ikuti patterns yang sudah ada
2. **Type Safety**: Gunakan TypeScript dengan proper interfaces  
3. **Performance**: Implement lazy loading dan optimize bundling
4. **Security**: Maintain JWT patterns dan validation
5. **UX**: Maintain glassmorphism theme dan smooth animations
6. **Scalability**: Build reusable components dari awal

**🎖️ PROJECT SUDAH SIAP UNTUK DEVELOPMENT LANJUTAN!**

Server development: `http://localhost:3003`  
Default credentials: `superadmin` / `Admin123!`

---

*Panduan ini dibuat untuk memastikan GPT-5 dapat melanjutkan development dengan patterns yang benar dan konsisten* ✨
