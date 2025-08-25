<template>
  <div class="p-6">
    <div class="card mb-4">
      <h1 class="text-xl font-semibold text-white mb-2">Alerts Center</h1>
      <p class="text-gray-300 text-sm">View, acknowledge, and resolve active alerts.</p>
    </div>

    <div class="card">
      <div class="flex items-center justify-between mb-3">
        <div class="text-gray-200 font-medium">Recent Alerts</div>
        <div class="flex gap-2">
          <button class="btn" :disabled="loading" @click="refresh">Refresh</button>
          <select v-model="statusFilter" class="bg-slate-800 text-gray-200 rounded px-2 py-1 text-sm">
            <option value="">All</option>
            <option value="OPEN">Open</option>
            <option value="ACK">Acknowledged</option>
            <option value="RESOLVED">Resolved</option>
          </select>
        </div>
      </div>

      <div v-if="error" class="text-red-400 text-sm mb-2">{{ error }}</div>
      <div v-if="loading" class="text-gray-400 text-sm">Loading…</div>
      <div v-else class="overflow-x-auto">
        <table class="min-w-full text-sm text-gray-200">
          <thead class="text-xs uppercase text-gray-400">
            <tr>
              <th class="text-left py-2 pr-4">Title</th>
              <th class="text-left py-2 pr-4">Zone</th>
              <th class="text-left py-2 pr-4">Severity</th>
              <th class="text-left py-2 pr-4">Status</th>
              <th class="text-left py-2 pr-4">Updated</th>
              <th class="text-left py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="a in alerts" :key="a._id" class="border-t border-white/10">
              <td class="py-2 pr-4">{{ a.title }}</td>
              <td class="py-2 pr-4">{{ a.zoneName }}</td>
              <td class="py-2 pr-4">
                <span :class="severityClass(a.severity)">{{ a.severity }}</span>
              </td>
              <td class="py-2 pr-4">{{ a.status }}</td>
              <td class="py-2 pr-4">{{ formatTime(a.updatedAt) }}</td>
              <td class="py-2 pr-4">
                <div class="flex gap-2">
                  <button class="btn btn-xs" :disabled="a.status !== 'OPEN' || ackBusyId === a._id || !canAck" @click="ack(a._id)">Ack</button>
                  <button class="btn btn-xs" :disabled="a.status === 'RESOLVED' || resolveBusyId === a._id || !canResolve" @click="resolve(a._id)">Resolve</button>
                </div>
              </td>
            </tr>
            <tr v-if="alerts.length === 0">
              <td colspan="6" class="py-6 text-center text-gray-400">No alerts found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  
</template>
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

useHead({ title: 'Alerts - Admin' })
definePageMeta({ layout: 'admin', middleware: ['auth','perm'], requiredPermissions: ['alerts:read'] })

type Alert = {
  _id: string
  title: string
  zoneName?: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'OPEN' | 'ACK' | 'RESOLVED'
  updatedAt: string
}

const auth = useAuthStore()
const canAck = computed(() => auth.can('alerts:ack'))
const canResolve = computed(() => auth.can('alerts:resolve'))

const alerts = ref<Alert[]>([])
const loading = ref(false)
const error = ref('')
const statusFilter = ref('')
const ackBusyId = ref<string | null>(null)
const resolveBusyId = ref<string | null>(null)

async function refresh() {
  loading.value = true
  error.value = ''
  try {
    const q = statusFilter.value ? `?status=${encodeURIComponent(statusFilter.value)}` : ''
    const data = await $fetch<{ alerts: Alert[] }>(`/api/alerts${q}`)
    alerts.value = data.alerts
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Failed to load alerts'
  } finally {
    loading.value = false
  }
}

function formatTime(ts: string) {
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  const diffMs = new Date(ts).getTime() - Date.now()
  const abs = Math.abs(diffMs)
  const sec = Math.round(abs / 1000)
  if (sec < 60) return rtf.format(Math.sign(diffMs) * -sec, 'second')
  const min = Math.round(sec / 60)
  if (min < 60) return rtf.format(Math.sign(diffMs) * -min, 'minute')
  const hrs = Math.round(min / 60)
  if (hrs < 24) return rtf.format(Math.sign(diffMs) * -hrs, 'hour')
  const days = Math.round(hrs / 24)
  return rtf.format(Math.sign(diffMs) * -days, 'day')
}
function severityClass(s: Alert['severity']) {
  if (s === 'HIGH') return 'text-red-400'
  if (s === 'MEDIUM') return 'text-yellow-300'
  return 'text-green-300'
}

async function ack(id: string) {
  if (!canAck.value) return
  ackBusyId.value = id
  try {
    await $fetch(`/api/alerts/ack`, { method: 'POST', body: { id } })
    await refresh()
  } catch (e) {
    // no-op UI error; refresh will show latest
  } finally {
    ackBusyId.value = null
  }
}
async function resolve(id: string) {
  if (!canResolve.value) return
  resolveBusyId.value = id
  try {
    await $fetch(`/api/alerts/resolve`, { method: 'POST', body: { id } })
    await refresh()
  } catch (e) {
    // no-op
  } finally {
    resolveBusyId.value = null
  }
}

onMounted(refresh)
</script>

<style scoped>
.card { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; }
.btn { background: rgba(255,255,255,0.1); color: #e5e7eb; border: 1px solid rgba(255,255,255,0.12); padding: 6px 10px; border-radius: 8px; font-size: 12px; }
.btn:disabled { opacity: 0.5; }
.btn-xs { padding: 4px 8px; font-size: 11px; }
</style>
