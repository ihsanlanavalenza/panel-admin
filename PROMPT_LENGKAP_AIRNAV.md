# 🚁 PROMPT LENGKAP: INDONESIAN AIRSPACE SURVEILLANCE SYSTEM - ADMIN PANEL

## 📋 PROJECT OVERVIEW
Buatlah sistem admin panel untuk **Indonesian Airspace Surveillance System (AIRNAV Indonesia)** dengan teknologi modern dan UI profesional. Aplikasi ini adalah sistem monitoring dan kontrol lalu lintas udara untuk otoritas penerbangan Indonesia dengan keamanan tingkat enterprise.

---

## 🎯 TECHNICAL REQUIREMENTS

### **Framework & Technology Stack**
- **Frontend**: Nuxt 4 dengan Vue 3 Composition API
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism Effects
- **State Management**: Pinia dengan Options API pattern
- **Database**: MySQL dengan Prisma ORM v6.14.0
- **Authentication**: JWT tokens dengan HTTP-only cookies
- **Security**: bcryptjs, rate limiting, account lockout
- **TypeScript**: Full type safety dengan interfaces

### **Project Structure (Nuxt 4)**
```
/
├── app/                        # Nuxt 4 app directory
│   ├── app.vue                # Root application
│   ├── pages/                 # Auto-routed pages
│   │   ├── index.vue         # Landing → redirect to login
│   │   ├── login.vue         # Authentication page
│   │   └── admin/
│   │       └── dashboard.vue # Main admin dashboard
│   ├── stores/               # Pinia state management
│   │   └── auth.ts          # Authentication store
│   ├── middleware/           # Route protection
│   │   └── auth.ts          # Auth middleware
│   ├── components/          # Reusable components
│   ├── layouts/             # Layout templates
│   └── composables/         # Custom composables
├── server/                   # Nitro server
│   └── api/
│       └── auth/            # Authentication APIs
├── prisma/                  # Database management
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Default data seeding
├── nuxt.config.ts          # Nuxt 4 configuration
└── package.json            # Dependencies
```

---

## 🎨 UI/UX DESIGN REQUIREMENTS

### **Visual Theme**
- **Color Scheme**: Dark blue aviation theme (#0b1220, #0c4a6e, #075985)
- **Design Style**: Modern glassmorphism dengan backdrop blur
- **Typography**: Inter font family, clean dan readable
- **Layout**: Responsive grid system, mobile-first approach

### **Key UI Components**
1. **Glassmorphism Cards**: 
   ```css
   .glass {
     background: rgba(12, 74, 110, 0.15);
     backdrop-filter: blur(12px);
     border: 1px solid rgba(255, 255, 255, 0.18);
     border-radius: 16px;
   }
   ```

2. **Form Elements**:
   ```css
   .form-input {
     background: rgba(255, 255, 255, 0.1);
     border: 1px solid rgba(255, 255, 255, 0.2);
     color: white;
     backdrop-filter: blur(8px);
   }
   ```

3. **Professional Buttons**:
   ```css
   .btn-primary {
     background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
     transition: all 0.3s ease;
     transform: hover scale(1.02);
   }
   ```

---

## 🔐 AUTHENTICATION SYSTEM

### **User Roles & Permissions**
- **SUPER_ADMIN**: Full system access, user management, system configuration
- **ATC (Air Traffic Controller)**: Dashboard monitoring, flight tracking, limited admin access

### **Security Features**
- JWT token dengan refresh token mechanism
- Account lockout setelah 5 failed attempts
- Password hashing dengan bcrypt (12 rounds)
- Simple captcha system untuk login protection
- HTTP-only cookies untuk token storage
- CSRF protection dengan SameSite cookies

### **Database Schema**
```prisma
model User {
  id            String   @id @default(cuid())
  username      String   @unique
  email         String   @unique
  password      String   // bcrypt hashed
  fullName      String
  role          Role     @default(ATC)
  status        Status   @default(ACTIVE)
  loginAttempts Int      @default(0)
  lastLogin     DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
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

### **Default Test Accounts**
- **Super Admin**: `superadmin` / `Admin123!`
- **ATC Controller**: `atc1` / `Atc123!`

---

## 📱 PAGE SPECIFICATIONS

### **1. Landing Page (`/`)**
- Auto-redirect ke login page
- Loading animation dengan aviation theme
- Professional branding dengan logo AIRNAV

### **2. Login Page (`/login`)**
```vue
<template>
  <div class="min-h-screen gradient-bg flex items-center justify-center">
    <div class="glass rounded-3xl p-8 max-w-md w-full">
      <!-- Logo & Branding -->
      <div class="logo-container">
        <div class="logo">🛩️</div>
        <h1>AIRNAV Indonesia</h1>
        <p>Airspace Surveillance System</p>
      </div>
      
      <!-- Login Form -->
      <form @submit.prevent="handleLogin">
        <input v-model="form.usernameOrEmail" class="form-input" placeholder="Username atau Email">
        <input v-model="form.password" type="password" class="form-input" placeholder="Password">
        
        <!-- Captcha System -->
        <div class="captcha-group">
          <input v-model="form.captchaAnswer" class="form-input" placeholder="Kode Captcha">
          <div class="captcha-display">{{ captcha.value }}</div>
        </div>
        
        <label class="remember-me">
          <input v-model="form.rememberMe" type="checkbox">
          Ingat saya selama 30 hari
        </label>
        
        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Memverifikasi...' : 'Masuk ke Sistem' }}
        </button>
      </form>
    </div>
  </div>
</template>
```

### **3. Admin Dashboard (`/admin/dashboard`)**
```vue
<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <header class="glass border-b">
      <div class="flex justify-between items-center">
        <div class="brand-section">
          <h1>AIRNAV Dashboard</h1>
          <p>Indonesian Airspace Surveillance</p>
        </div>
        <div class="user-section">
          <span>{{ user.fullName }} ({{ user.role }})</span>
          <button @click="logout" class="btn-secondary">Logout</button>
        </div>
      </div>
    </header>
    
    <!-- Statistics Grid -->
    <div class="stats-grid">
      <div v-for="stat in statistics" class="glass stat-card">
        <h3>{{ stat.title }}</h3>
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-change">{{ stat.change }}</div>
      </div>
    </div>
    
    <!-- Dashboard Content -->
    <div class="dashboard-grid">
      <!-- Real-time Activities -->
      <div class="glass content-card">
        <h3>Aktivitas Terkini</h3>
        <div v-for="activity in activities" class="activity-item">
          <span class="activity-time">{{ activity.time }}</span>
          <span class="activity-desc">{{ activity.description }}</span>
        </div>
      </div>
      
      <!-- System Status -->
      <div class="glass content-card">
        <h3>Status Sistem</h3>
        <div v-for="system in systemStatus" class="status-item">
          <div class="status-indicator" :class="system.status"></div>
          <span>{{ system.name }}: {{ system.uptime }}</span>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="glass content-card">
        <h3>Aksi Cepat</h3>
        <div class="action-grid">
          <button v-for="action in quickActions" class="action-btn">
            <svg class="action-icon">{{ action.icon }}</svg>
            {{ action.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
```

---

## ⚡ VUE 3 COMPOSITION API PATTERNS

### **WAJIB Mengikuti Pattern Ini**
```vue
<script setup lang="ts">
// 1. Imports
import { useAuthStore } from '~/stores/auth'

// 2. Metadata dengan useHead()
useHead({
  title: 'Page Title - AIRNAV Indonesia'
})

// 3. Stores & Composables
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

// 4. Reactive State
const loading = ref(false)
const error = ref<string | null>(null)
const data = reactive({
  // reactive properties
})

// 5. Computed Properties
const isAuthenticated = computed(() => authStore.isAuthenticated)

// 6. Methods
const handleAction = async () => {
  loading.value = true
  try {
    // async operations dengan $fetch()
    const result = await $fetch('/api/endpoint')
    // handle success
  } catch (e: any) {
    error.value = e.data?.message || 'Error occurred'
  } finally {
    loading.value = false
  }
}

// 7. Lifecycle Hooks
onMounted(() => {
  // initialization
})

// 8. Watchers (jika diperlukan)
watch(() => data.someValue, (newVal) => {
  // handle changes
})
</script>
```

### **Pinia Store Pattern (Options API)**
```typescript
export const useAuthStore = defineStore('auth', {
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
      this.error = null
      
      try {
        const data = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })
        
        this.user = data.user
        this.accessToken = data.accessToken
        return { success: true }
      } catch (e: any) {
        this.error = e.data?.message || 'Login failed'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    }
  }
})
```

---

## 🔧 API ENDPOINTS

### **Authentication APIs**
```typescript
// server/api/auth/login.post.ts
export default defineEventHandler(async (event) => {
  try {
    const { usernameOrEmail, password, captchaAnswer } = await readBody(event)
    
    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    })
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      // Increment login attempts
      await prisma.user.update({
        where: { id: user.id },
        data: { 
          loginAttempts: user.loginAttempts + 1,
          status: user.loginAttempts >= 4 ? 'LOCKED' : user.status
        }
      })
      
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }
    
    // Generate JWT
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      config.jwtSecret,
      { expiresIn: '1d' }
    )
    
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role
        },
        accessToken
      }
    }
    
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Authentication failed'
    })
  }
})
```

---

## 🎨 CSS SYSTEM

### **Global CSS Utilities (di app.vue)**
```css
<style>
/* CSS Custom Properties */
:root {
  --primary-blue: #1e40af;
  --primary-dark: #1e3a8a;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --shadow-glass: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Glassmorphism Base */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow-glass);
}

/* Form Components */
.form-input {
  @apply w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300;
}

.btn-primary {
  @apply w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg;
}

/* Layout Utilities */
.gradient-bg {
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1e3a8a 100%);
}

.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6;
}

/* Animations */
.fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
```

---

## ⚙️ CONFIGURATION FILES

### **nuxt.config.ts (Nuxt 4)**
```typescript
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Nuxt 4 Configuration
  future: {
    compatibilityVersion: 4
  },
  
  srcDir: 'app/',
  
  modules: ['@pinia/nuxt'],
  
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {}
    }
  },
  
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    public: {
      apiBase: '/api'
    }
  },
  
  app: {
    head: {
      title: 'AIRNAV - Indonesian Airspace Surveillance System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
```

### **package.json Dependencies**
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
    "prisma": "^6.14.0",
    "@types/bcryptjs": "^2.4.6",
    "@types/jsonwebtoken": "^9.0.7"
  }
}
```

---

## 🚀 DEVELOPMENT WORKFLOW

### **Setup Commands**
```bash
# 1. Install dependencies
npm install

# 2. Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# 3. Create .env file
DATABASE_URL="mysql://username:password@localhost:3306/airnav_admin"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# 4. Run development server
npm run dev
# Server: http://localhost:3003
```

### **Testing Credentials**
- **Super Admin**: Username `superadmin`, Password `Admin123!`
- **ATC Controller**: Username `atc1`, Password `Atc123!`

---

## ⚠️ CRITICAL RULES - WAJIB DIIKUTI

1. **SELALU gunakan Composition API** - Hindari Options API untuk components
2. **SELALU gunakan useHead()** untuk metadata - Jangan gunakan head()
3. **SELALU gunakan $fetch()** untuk API calls - Jangan gunakan axios/fetch
4. **SELALU gunakan navigateTo()** untuk routing - Jangan gunakan $router.push
5. **SELALU implementasikan loading states** - UX yang baik
6. **SELALU gunakan TypeScript interfaces** - Type safety
7. **SELALU gunakan glassmorphism classes** - Konsistensi UI theme
8. **SELALU handle error states** - Professional error handling

---

## 🎯 FUNCTIONAL REQUIREMENTS

### **Dashboard Features**
- Real-time flight statistics dengan auto-update
- System status monitoring (radar, communication, weather)
- Recent activity feed dengan timestamp
- Quick action buttons untuk common tasks
- Responsive grid layout untuk semua devices
- Professional aviation-themed icons

### **Security Requirements**
- JWT token dengan refresh mechanism
- Account lockout setelah 5 failed attempts
- Session timeout dengan automatic redirect
- CSRF protection dengan SameSite cookies
- Input validation dan sanitization
- Audit logging untuk admin actions

### **Performance Requirements**
- Lazy loading untuk components besar
- Optimized images dan assets
- Efficient state management dengan Pinia
- Fast page transitions dengan Nuxt 3
- Mobile-optimized responsive design

---

## 🔮 FUTURE ENHANCEMENTS

### **Phase 2 Features**
- Advanced dashboard widgets (charts, maps)
- Real-time flight tracking dengan WebSocket
- File upload system untuk documents
- User management CRUD interface
- Email notification system
- Advanced reporting dengan PDF export

### **Phase 3 Features**
- Integration dengan real aviation APIs
- Multi-language support (ID/EN)
- Advanced role-based permissions
- API documentation dengan Swagger
- Unit testing dengan Vitest
- E2E testing dengan Playwright

---

## 📝 ACCEPTANCE CRITERIA

### **UI/UX**
- ✅ Professional aviation-themed design dengan dark blue colors
- ✅ Glassmorphism effects dengan smooth animations
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Loading states untuk semua async operations
- ✅ Error handling dengan user-friendly messages

### **Functionality**
- ✅ Secure authentication dengan JWT tokens
- ✅ Role-based access control (SUPER_ADMIN/ATC)
- ✅ Real-time dashboard dengan live data simulation
- ✅ Account lockout protection dengan captcha
- ✅ Session management dengan auto-logout

### **Technical**
- ✅ Nuxt 4 dengan proper app directory structure
- ✅ Vue 3 Composition API untuk all components
- ✅ TypeScript dengan proper interfaces
- ✅ Prisma ORM dengan MySQL database
- ✅ Production-ready security implementations

---

## 🎖️ FINAL NOTES

Aplikasi ini adalah **enterprise-grade aviation management system** yang membutuhkan:
- **High security standards** untuk aviation industry
- **Professional UI/UX** yang sesuai dengan corporate aviation standards  
- **Scalable architecture** untuk future enhancements
- **Modern technology stack** dengan best practices
- **Type-safe development** dengan TypeScript

**Target Users**: Air Traffic Controllers, Aviation Administrators, System Operators
**Industry**: Indonesian Aviation Authority (AIRNAV Indonesia)
**Security Level**: Enterprise/Government grade

---

*Prompt ini menghasilkan sistem admin panel aviation yang professional, secure, dan scalable dengan teknologi terdepan. Ikuti semua spesifikasi dengan teliti untuk hasil optimal.* ✈️🚁
