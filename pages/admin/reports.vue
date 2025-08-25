<template>
  <div class="p-6">
    <div class="card">
      <h1 class="text-xl font-semibold text-white mb-2">Reports</h1>
      <p class="text-gray-300 text-sm">Coming soon.</p>
    </div>
  </div>
</template>
<script setup>
useHead({ title: 'Reports - Admin' })
definePageMeta({ layout: 'admin', middleware: ['auth','perm'], requiredPermissions: ['analytics:read'] })
</script>
