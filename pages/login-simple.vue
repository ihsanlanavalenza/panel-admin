<template>
  <div class="login-page">
    <div class="login-card">
      <div class="logo-section">
        <div class="logo">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
            <path d="M24 6L38 20L34 24L24 14L14 24L10 20L24 6Z" fill="#ffffff"/>
            <path d="M24 42L10 28L14 24L24 34L34 24L38 28L24 42Z" fill="#ffffff" opacity="0.7"/>
            <circle cx="24" cy="24" r="3" fill="#ffffff"/>
          </svg>
        </div>
        <h1>Indonesian Airspace System</h1>
        <p>Admin Control Panel</p>
      </div>
      
      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Username / Email</label>
          <input 
            v-model="username" 
            type="text" 
            placeholder="Enter username (try: superadmin)"
            required 
          />
        </div>
        
        <div class="input-group">
          <label>Password</label>
          <input 
            v-model="password" 
            type="password" 
            placeholder="Enter password (try: Admin123!)"
            required 
          />
        </div>
        
        <div class="captcha-group">
          <input 
            v-model="captcha" 
            type="number" 
            placeholder="="
            required 
          />
          <span>{{ captchaQuestion }}</span>
          <button type="button" @click="refreshCaptcha">Refresh</button>
        </div>
        
        <div class="checkbox-group">
          <input v-model="remember" type="checkbox" id="remember" />
          <label for="remember">Remember me for 30 days</label>
        </div>
        
        <button type="submit" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
        
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="success" class="success">{{ success }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
const username = ref('superadmin')
const password = ref('Admin123!')
const captcha = ref('')
const remember = ref(false)
const loading = ref(false)
const error = ref('')
const success = ref('')
const captchaQuestion = ref('2 + 3')
const captchaAnswer = ref(5)

function refreshCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  captchaQuestion.value = `${a} + ${b}`
  captchaAnswer.value = a + b
  captcha.value = ''
}

async function handleLogin() {
  loading.value = true
  error.value = ''
  success.value = ''
  
  // Validate captcha
  if (parseInt(captcha.value) !== captchaAnswer.value) {
    error.value = 'Captcha incorrect. Please try again.'
    loading.value = false
    refreshCaptcha()
    return
  }
  
  try {
    // Test credentials
    if (username.value === 'superadmin' && password.value === 'Admin123!') {
      success.value = 'Login successful! Redirecting to dashboard...'
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 1500)
    } else if (username.value === 'atc1' && password.value === 'Atc123!') {
      success.value = 'Login successful! Redirecting to dashboard...'
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 1500)
    } else {
      error.value = 'Invalid credentials. Try: superadmin/Admin123! or atc1/Atc123!'
    }
  } catch (e) {
    error.value = 'Login failed: ' + e.message
  }
  
  loading.value = false
}

// Initialize captcha
onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
  backdrop-filter: blur(15px);
}

.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 64px;
  height: 64px;
  margin: 0 auto 1rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-section h1 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.logo-section p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.input-group input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  color: white;
  width: 100%;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input-group input:focus {
  outline: none;
  border-color: #0c4a6e;
  background: rgba(255, 255, 255, 0.15);
}

.captcha-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.captcha-group input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.875rem 1rem;
  color: white;
  width: 80px;
  font-size: 0.95rem;
}

.captcha-group span {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.captcha-group button {
  background: none;
  border: none;
  color: #0c4a6e;
  cursor: pointer;
  text-decoration: underline;
  font-size: 0.85rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.checkbox-group input {
  accent-color: #0c4a6e;
}

.checkbox-group label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  cursor: pointer;
}

button[type="submit"] {
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
  border: none;
  border-radius: 12px;
  padding: 0.875rem 1.5rem;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
}

button[type="submit"]:hover {
  background: linear-gradient(135deg, #075985 0%, #0b3954 100%);
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  color: #fca5a5;
  font-size: 0.9rem;
}

.success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  margin-top: 1rem;
  color: #86efac;
  font-size: 0.9rem;
}
</style>
