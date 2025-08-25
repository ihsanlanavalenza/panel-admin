<template>
  <div class="min-h-screen p-6">
    <div class="container mx-auto">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-white mb-2">
            Indonesian Airspace Control System
          </h1>
          <p class="text-gray-300">
            Dashboard Overview
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="text-sm text-gray-300">Welcome,</p>
            <p class="text-white font-medium">Administrator</p>
          </div>
          <button 
            @click="logout" 
            class="btn btn-secondary bg-red-600/20 border-red-500/30 text-red-300 hover:bg-red-600/30"
          >
            Logout
          </button>
        </div>
      </div>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          v-for="stat in statistics" 
          :key="stat.id"
          class="card"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                :class="stat.iconBg">
              {{ stat.icon }}
            </div>
            <div>
              <p class="text-gray-300 text-sm">{{ stat.label }}</p>
              <p class="text-2xl font-bold text-white">{{ stat.value }}</p>
            </div>
          </div>
        </div>
      </div>

  <!-- Main content (sidebar provided by admin layout) -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Recent Activity -->
            <div class="card">
              <h2 class="text-xl font-semibold text-white mb-4">
                Recent Activity
              </h2>
              <div class="space-y-3">
                <div 
                  v-for="activity in recentActivities" 
                  :key="activity.id"
                  class="flex items-start gap-3 p-3 rounded-lg bg-white/5"
                >
                  <div class="text-xs text-gray-400 font-mono min-w-[3rem]">
                    {{ activity.time }}
                  </div>
                  <div class="flex-1">
                    <p class="text-gray-300 text-sm">{{ activity.description }}</p>
                  </div>
                  <div 
                    class="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    :class="activity.statusClass"
                  ></div>
                </div>
              </div>
            </div>

            <!-- System Status -->
            <div class="card">
              <h2 class="text-xl font-semibold text-white mb-4">
                System Status
              </h2>
              <div class="space-y-4">
                <div 
                  v-for="system in systemStatus" 
                  :key="system.id"
                  class="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div class="flex items-center gap-3">
                    <span 
                      class="status-indicator"
                      :class="system.statusClass"
                    ></span>
                    <span class="text-gray-300">{{ system.name }}</span>
                  </div>
                  <span 
                    class="text-sm font-medium px-2 py-1 rounded"
                    :class="system.badgeClass"
                  >
                    {{ system.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
// Metadata halaman
useHead({
  title: 'Dashboard - Indonesian Airspace System',
  meta: [
    { name: 'description', content: 'Admin Dashboard for Indonesian Airspace Control System' }
  ]
})

// Use admin layout + permission gating
definePageMeta({ layout: 'admin', middleware: ['auth','perm'], requiredPermissions: ['flights:read'] })

// Reactive data
const statistics = ref([
  {
    id: 1,
    icon: '✈️',
    label: 'Active Flights',
    value: '247',
    iconBg: 'bg-blue-600/20'
  },
  {
    id: 2,
    icon: '👨‍✈️',
    label: 'ATC Controllers',
    value: '18',
    iconBg: 'bg-green-600/20'
  },
  {
    id: 3,
    icon: '📡',
    label: 'Active Sectors',
    value: '12',
    iconBg: 'bg-purple-600/20'
  },
  {
    id: 4,
    icon: '⚠️',
    label: 'Alerts',
    value: '3',
    iconBg: 'bg-orange-600/20'
  }
])

const recentActivities = ref([
  {
    id: 1,
    time: '14:32',
    description: 'Flight GA123 entered sector 7',
    statusClass: 'status-online'
  },
  {
    id: 2,
    time: '14:28',
    description: 'ATC John Smith logged in',
    statusClass: 'status-online'
  },
  {
    id: 3,
    time: '14:25',
    description: 'Weather alert issued for sector 3',
    statusClass: 'status-warning'
  },
  {
    id: 4,
    time: '14:20',
    description: 'Flight SJ182 requesting clearance',
    statusClass: 'status-online'
  },
  {
    id: 5,
    time: '14:15',
    description: 'System maintenance completed',
    statusClass: 'status-online'
  }
])

const systemStatus = ref([
  {
    id: 1,
    name: 'Primary Radar',
    status: 'Online',
    statusClass: 'status-online',
    badgeClass: 'bg-green-600/20 text-green-300'
  },
  {
    id: 2,
    name: 'Secondary Radar',
    status: 'Online',
    statusClass: 'status-online',
    badgeClass: 'bg-green-600/20 text-green-300'
  },
  {
    id: 3,
    name: 'Communication',
    status: 'Limited',
    statusClass: 'status-warning',
    badgeClass: 'bg-yellow-600/20 text-yellow-300'
  },
  {
    id: 4,
    name: 'Navigation System',
    status: 'Online',
    statusClass: 'status-online',
    badgeClass: 'bg-green-600/20 text-green-300'
  }
])


// Methods
const logout = () => {
  if (confirm('Are you sure you want to logout?')) {
    navigateTo('/login')
  }
}

// Quick Actions moved to sidebar component

// Real-time updates simulation
onMounted(() => {
  // Simulate real-time data updates
  const interval = setInterval(() => {
    // Update flight count
    const currentFlights = parseInt(statistics.value[0].value)
    statistics.value[0].value = (currentFlights + Math.floor(Math.random() * 3) - 1).toString()
    
    // Update alerts
    const currentAlerts = parseInt(statistics.value[3].value)
    if (Math.random() > 0.8) {
      statistics.value[3].value = (currentAlerts + 1).toString()
    }
  }, 5000)

  // Cleanup interval on unmount
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<style scoped>
.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

/* Custom gradient backgrounds */

.bg-blue-600\/20 {
  background-color: rgb(37 99 235 / 0.2);
}

.bg-green-600\/20 {
  background-color: rgb(22 163 74 / 0.2);
}

.bg-purple-600\/20 {
  background-color: rgb(147 51 234 / 0.2);
}

.bg-orange-600\/20 {
  background-color: rgb(234 88 12 / 0.2);
}

.bg-red-600\/20 {
  background-color: rgb(220 38 38 / 0.2);
}

.bg-red-600\/30 {
  background-color: rgb(220 38 38 / 0.3);
}

.bg-yellow-600\/20 {
  background-color: rgb(202 138 4 / 0.2);
}

.bg-white\/5 {
  background-color: rgb(255 255 255 / 0.05);
}

.border-red-500\/30 {
  border-color: rgb(239 68 68 / 0.3);
}

.text-red-300 {
  color: rgb(252 165 165);
}

.text-green-300 {
  color: rgb(134 239 172);
}

.text-yellow-300 {
  color: rgb(253 224 71);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .flex.justify-between.items-center {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
