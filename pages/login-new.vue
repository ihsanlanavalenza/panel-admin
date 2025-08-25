<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="container mx-auto">
      <div class="glass p-8 mx-auto" style="max-width: 420px;">
        <!-- Header Section -->
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
              <path d="M24 6L38 20L34 24L24 14L14 24L10 20L24 6Z" fill="#ffffff"/>
              <path d="M24 42L10 28L14 24L24 34L34 24L38 28L24 42Z" fill="#ffffff" opacity="0.7"/>
              <circle cx="24" cy="24" r="3" fill="#ffffff"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-white mb-2">
            Indonesian Airspace System
          </h1>
          <p class="text-gray-300 text-sm">
            Admin Control Panel
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="form-label">
              Username / Email
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="form-input"
              placeholder="Enter your username or email"
              required
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="form-label">
              Password
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <!-- Captcha Field -->
          <div class="flex items-center gap-3">
            <div class="flex-1">
              <input
                v-model="form.captcha"
                type="number"
                class="form-input"
                placeholder="Answer"
                required
              />
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <span class="font-medium">{{ captcha.question }}</span>
              <button
                type="button"
                @click="refreshCaptcha"
                class="text-blue-400 hover:text-blue-300 underline text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center">
            <input
              id="remember"
              v-model="form.remember"
              type="checkbox"
              class="mr-2 accent-blue-600"
            />
            <label for="remember" class="text-gray-300 text-sm cursor-pointer">
              Remember me for 30 days
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="btn btn-primary"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>

          <!-- Error Message -->
          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>

          <!-- Success Message -->
          <div v-if="success" class="alert alert-success">
            {{ success }}
          </div>
        </form>

        <!-- Test Credentials Info -->
        <div class="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <p class="text-xs text-blue-200 mb-2 font-medium">Test Credentials:</p>
          <p class="text-xs text-blue-300">superadmin / Admin123!</p>
          <p class="text-xs text-blue-300">atc1 / Atc123!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Metadata halaman
useHead({
  title: 'Login - Indonesian Airspace System',
  meta: [
    { name: 'description', content: 'Login to Indonesian Airspace Control System' }
  ]
})

// Reactive state
const form = reactive({
  username: 'superadmin',
  password: 'Admin123!',
  captcha: '',
  remember: false
})

const captcha = reactive({
  question: '2 + 3',
  answer: 5
})

const loading = ref(false)
const error = ref('')
const success = ref('')

// Methods
const refreshCaptcha = () => {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  captcha.question = `${a} + ${b}`
  captcha.answer = a + b
  form.captcha = ''
}

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  // Validate captcha
  if (parseInt(form.captcha) !== captcha.answer) {
    error.value = 'Captcha answer is incorrect. Please try again.'
    loading.value = false
    refreshCaptcha()
    return
  }

  try {
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check credentials
    if (
      (form.username === 'superadmin' && form.password === 'Admin123!') ||
      (form.username === 'atc1' && form.password === 'Atc123!')
    ) {
      success.value = 'Login successful! Redirecting to dashboard...'
      
      // Redirect after success message
      setTimeout(() => {
        navigateTo('/admin/dashboard')
      }, 1500)
    } else {
      error.value = 'Invalid credentials. Please check your username and password.'
    }
  } catch (err) {
    error.value = 'An error occurred during login. Please try again.'
  } finally {
    loading.value = false
  }
}

// Initialize captcha on mount
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-blue-600 {
  --tw-gradient-from: #2563eb;
  --tw-gradient-to: rgb(37 99 235 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.to-blue-800 {
  --tw-gradient-to: #1e40af;
}
</style>
