<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="container mx-auto text-center">
      <div class="glass p-8 mx-auto" style="max-width: 500px;">
        <!-- Logo Section -->
        <div class="mb-6">
          <div class="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6L38 20L34 24L24 14L14 24L10 20L24 6Z" fill="#ffffff"/>
              <path d="M24 42L10 28L14 24L24 34L34 24L38 28L24 42Z" fill="#ffffff" opacity="0.7"/>
              <circle cx="24" cy="24" r="3" fill="#ffffff"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Indonesian Airspace System
          </h1>
          <p class="text-gray-300">
            Admin Control Panel
          </p>
        </div>

        <!-- Loading Section -->
        <div class="mb-6">
          <div class="loading-spinner"></div>
          <p class="text-gray-300 mb-4">Initializing system...</p>
        </div>

        <!-- Action Button -->
        <button 
          @click="redirectToLogin" 
          class="btn btn-primary mb-4"
        >
          Go to Login Panel
        </button>

        <!-- System Info -->
        <div class="text-sm text-gray-400">
          <p>Server: localhost:3001</p>
          <p>Status: Online</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Metadata halaman
useHead({
  title: 'Indonesian Airspace System - Home',
  meta: [
    { name: 'description', content: 'Indonesian Airspace Control System - Admin Panel' }
  ]
})

// Reactive state
const isLoading = ref(true)

// Methods
const redirectToLogin = () => {
  navigateTo('/login')
}

// Auto redirect setelah 5 detik
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
  
  setTimeout(() => {
    redirectToLogin()
  }, 5000)
})
</script>

<style scoped>
/* Component specific styles jika diperlukan */
.loading-spinner {
  width: 40px;
  height: 40px;
}
</style>
