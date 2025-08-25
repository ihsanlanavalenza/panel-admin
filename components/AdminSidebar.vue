<template>
  <aside
    ref="sidebarEl"
    class="admin-sidebar"
    :class="{ collapsed: props.collapsed }"
    aria-label="Admin sidebar"
    tabindex="-1"
    @keydown.esc.prevent.stop="emitCloseOnMobile()"
  >
    <div class="sb-header">
      <button
        class="sb-toggle"
        @click="toggle()"
        :aria-pressed="props.collapsed ? 'true' : 'false'"
        :title="props.collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <span v-if="props.collapsed">»</span>
        <span v-else>«</span>
      </button>
      <div v-if="!props.collapsed" class="sb-title">Quick Actions</div>
      <!-- spacer agar judul benar-benar center secara visual -->
      <div v-if="!props.collapsed" class="sb-spacer" aria-hidden="true"></div>
    </div>

  <nav class="sb-nav" aria-label="Quick Actions">
      <NuxtLink
        v-for="it in visibleItems"
        :key="it.name"
        :to="it.to"
        class="sb-link"
        :class="{ active: route.name === it.to.name }"
        :aria-current="route.name === it.to.name ? 'page' : undefined"
        :title="props.collapsed ? it.tip : undefined"
        @click="emitCloseOnMobile()"
      >
        <span class="sb-icon">
          <component :is="it.component" class="w-5 h-5" />
        </span>
        <span v-if="!props.collapsed" class="sb-text">{{ it.name }}</span>
      </NuxtLink>
    </nav>

    <div class="sb-footer" v-if="!props.collapsed">
      Indonesian Airspace System
    </div>
  </aside>
  
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
import { IconDashboard, IconUsers, IconReports, IconSettings, IconAlerts } from '~/components/icons'
import { useRoute } from '#imports'
import { useAuthStore } from '~/stores/auth'
import type { Permission } from '~/utils/permissions'

type Item = { name: string; to: { name: string }; icon?: string; tip: string; perm?: Permission | Permission[]; component?: any }

const items: Item[] = [
  { name: 'Dashboard',       to: { name: 'admin-dashboard' }, tip: 'Dashboard',       component: IconDashboard },
  { name: 'Manage Users',    to: { name: 'admin-users' },    tip: 'Manage Users',    perm: 'users:read',       component: IconUsers },
  { name: 'View Reports',    to: { name: 'admin-reports' },  tip: 'View Reports',    perm: 'analytics:read',   component: IconReports },
  { name: 'System Settings', to: { name: 'admin-settings' }, tip: 'System Settings', perm: 'access:update',    component: IconSettings },
  { name: 'Alerts Center',   to: { name: 'admin-alerts' },   tip: 'Alerts',          perm: 'alerts:read',      component: IconAlerts },
]

const route = useRoute()
const sidebarEl = ref<HTMLElement | null>(null)
const auth = useAuthStore()

const visibleItems = computed(() =>
  items.filter((it) => {
    if (!it.perm) return true
    const perms = (Array.isArray(it.perm) ? it.perm : [it.perm]) as Permission[]
    return perms.every((p: Permission) => auth.can(p))
  })
)

const props = defineProps<{ collapsed: boolean }>()
const emit = defineEmits<{ (e: 'request-close-mobile'): void; (e: 'update:collapsed', value: boolean): void }>()

function emitCloseOnMobile() { emit('request-close-mobile') }

onMounted(async () => {
  await nextTick()
  // Focus when opened in mobile (parent controls visibility)
  sidebarEl.value?.focus()
})

function toggle() { emit('update:collapsed', !props.collapsed) }
</script>

<style scoped>
.admin-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  width: var(--sidebar-w, 240px);
  display: flex;
  flex-direction: column;
  background: rgba(15, 23, 42, 0.7); /* slate-900/70 */
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0 16px 16px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,.3);
  transition: width 180ms ease;
}
/* collapsed class kept for potential child overrides; width controlled via CSS var */

.sb-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 14px 10px;
  position: relative;
}
.sb-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: rgba(255,255,255,0.06);
  color: #e5e7eb;
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 18px;
  line-height: 1;
}
.sb-toggle:hover { background: rgba(255,255,255,0.08); }
.sb-toggle:focus { outline: none; box-shadow: 0 0 0 2px rgba(255,255,255,0.2); }
.sb-title {
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(90deg,#93c5fd,#c4b5fd 55%,#93c5fd);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 0 4px rgba(148,163,184,0.35));
}
.sb-spacer { width: 42px; height: 42px; }

@media (max-width: 900px) {
  .sb-title { font-size: 0.9rem; letter-spacing: 0.3px; }
  .sb-toggle, .sb-spacer { width: 38px; height: 38px; }
}

.sb-nav { padding: 6px 8px; display: grid; gap: 6px; }
.sb-link {
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  padding: 8px 12px;
  color: #e5e7eb;
  text-decoration: none;
}
.sb-link:hover { background: rgba(255,255,255,0.08); }
.sb-link.active { background: rgba(255,255,255,0.12); outline: 1px solid rgba(255,255,255,0.1); }
.sb-icon { font-size: 18px; line-height: 1; }
.sb-text { font-size: 0.9rem; font-weight: 500; }

.sb-footer {
  margin-top: auto;
  padding: 12px;
  font-size: 11px;
  opacity: 0.6;
}

/* Tooltip sederhana untuk mode collapsed */
a[title] { position: relative; }
a[title]:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
  padding: 4px 8px;
  font-size: 11px;
  background: rgba(0,0,0,.75);
  color: white;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
}
</style>
