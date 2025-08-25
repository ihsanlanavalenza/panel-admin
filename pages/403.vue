<template>
  <div class="min-h-screen flex items-center justify-center text-center p-8">
    <div class="max-w-md space-y-4">
      <h1 class="text-3xl font-bold text-white">Tidak Diizinkan (403)</h1>
      <p class="text-gray-300">Anda tidak memiliki akses ke fitur ini.</p>
      <NuxtLink to="/admin/dashboard" class="inline-block px-4 py-2 rounded bg-white/10 hover:bg-white/20">Kembali ke Dashboard</NuxtLink>
    </div>
  </div>
</template>

<script setup>
useHead({ title: '403 - Tidak Diizinkan' })
</script>

<style scoped></style>
