<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
// Metadata untuk aplikasi
useHead({
  title: 'Indonesian Airspace Control System',
  meta: [
    { name: 'description', content: 'Admin Panel for Indonesian Aviation Control System' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<style>
/* Global CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(135deg, #0b1220 0%, #0c4a6e 100%);
  color: white;
  line-height: 1.6;
}

/* Nuxt App Container */
#__nuxt {
  min-height: 100vh;
}

/* CSS Custom Properties */
:root {
  --color-primary: #0c4a6e;
  --color-primary-dark: #075985;
  --color-secondary: #0b3954;
  --color-background: #0b1220;
  --color-surface: rgba(255, 255, 255, 0.1);
  --color-text: #ffffff;
  --color-text-secondary: rgba(255, 255, 255, 0.8);
  --color-text-muted: rgba(255, 255, 255, 0.6);
  --color-error: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  
  --border-radius: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 20px;
  
  --backdrop-blur: blur(12px);
}

/* Glassmorphism Effect */
.glass {
  background: rgba(12, 74, 110, 0.15);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

/* Layout Utilities */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.text-center { text-align: center; }
.w-full { width: 100%; }

/* Spacing */
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mb-8 { margin-bottom: 2rem; }

/* Grid */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .md\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}

/* Typography */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }

.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }

.text-white { color: var(--color-text); }
.text-gray-300 { color: var(--color-text-secondary); }
.text-gray-400 { color: var(--color-text-muted); }

/* Form Elements */
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius);
  color: var(--color-text);
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input:focus {
  border-color: var(--color-primary);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(12, 74, 110, 0.2);
}

.form-input::placeholder {
  color: var(--color-text-muted);
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  width: 100%;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary) 100%);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Cards */
.card {
  background: var(--color-surface);
  backdrop-filter: var(--backdrop-blur);
  -webkit-backdrop-filter: var(--backdrop-blur);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

/* Alert Messages */
.alert {
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.9rem;
  margin-top: 1rem;
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fca5a5;
}

.alert-success {
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #86efac;
}

/* Loading Spinner */
.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Status Indicators */
.status-indicator {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
}

.status-online {
  background-color: var(--color-success);
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.6);
}

.status-warning {
  background-color: var(--color-warning);
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
}

.status-offline {
  background-color: var(--color-error);
  box-shadow: 0 0 6px rgba(239, 68, 68, 0.6);
}

/* Responsive Design */
@media (max-width: 640px) {
  .container { padding: 0 0.5rem; }
  .text-3xl { font-size: 1.5rem; }
  .text-4xl { font-size: 1.875rem; }
  .p-8 { padding: 1rem; }
}
</style>
