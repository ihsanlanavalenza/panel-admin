<template>
  <div class="min-h-screen w-full bg-gradient-to-b from-slate-900 to-slate-800 text-slate-100">
    <!-- Top bar for mobile toggle -->
  <header class="lg:hidden sticky top-0 z-50 backdrop-blur bg-slate-900/70 ring-1 ring-white/10">
      <div class="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <div class="font-semibold">Admin</div>
        <button
          class="inline-flex items-center justify-center rounded-xl p-2 hover:bg-white/10 focus:outline-none focus:ring"
          @click="openSidebar()"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      </div>
    </header>

    <!-- Desktop layout (≥1024px): sidebar flush left + centered content -->
    <div class="hidden lg:grid" :style="gridStyle">
      <!-- Sidebar column -->
      <div>
        <AdminSidebar v-model:collapsed="collapsed" />
      </div>
      <!-- Content column -->
      <div>
        <!-- Removed top padding (py-6 -> pt-0 pb-6) so pages control their own top spacing -->
        <main class="mx-auto max-w-[1360px] px-6 pt-0 pb-6 min-h-[calc(100vh-48px)]">
          <slot />
        </main>
      </div>
    </div>

    <!-- Mobile/Tablet (<1024px): content centered, sidebar off-canvas when opened -->
    <div class="lg:hidden">
  <!-- Mobile: likewise remove top padding to avoid double stacking with page section -->
  <main class="mx-auto max-w-[768px] px-4 pt-0 pb-6 min-h-[calc(100vh-48px)]">
        <slot />
      </main>
    </div>

    <!-- Mobile off-canvas sidebar -->
    <transition name="fade">
  <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden" aria-modal="true" role="dialog">
        <div class="absolute inset-0 bg-black/50" @click="closeSidebar()" aria-hidden="true"></div>
        <div ref="offcanvasEl" class="absolute left-0 top-0 h-full p-3" :style="{ '--sidebar-w': sidebarWidth }" @keydown.esc.prevent.stop="closeSidebar()" @keydown.tab.prevent="trapFocus($event)">
          <div class="h-full">
            <AdminSidebar v-model:collapsed="collapsed" @request-close-mobile="closeSidebar()" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import AdminSidebar from '@/components/AdminSidebar.vue'

const isOpen = ref(false)
const collapsed = ref(false)
const STORAGE_KEY = 'admin.sidebar.collapsed'
const offcanvasEl = ref<HTMLElement | null>(null)

// Restore collapse state on mount
onMounted(async () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    collapsed.value = saved === 'true'
  } catch {}
  // Initialize CSS var for width on mount
  document.documentElement.style.setProperty('--sidebar-w', collapsed.value ? '72px' : '240px')
  await nextTick()
})

// Persist collapse state
watch(collapsed, v => {
  try { localStorage.setItem(STORAGE_KEY, String(v)) } catch {}
  // update CSS var for width
  document.documentElement.style.setProperty('--sidebar-w', v ? '72px' : '240px')
})

// Initialize CSS var immediately
const sidebarWidth = computed(() => (collapsed.value ? '72px' : '240px'))
const gridStyle = computed(() => ({
  gridTemplateColumns: `var(--sidebar-w, ${sidebarWidth.value}) 1fr`,
  columnGap: '24px',
  ['--sidebar-w']: sidebarWidth.value
}))

function openSidebar() {
  isOpen.value = true
  document.documentElement.style.overflow = 'hidden'
  // focus first focusable in panel
  setTimeout(() => focusFirstInPanel(), 0)
}
function closeSidebar() {
  isOpen.value = false
  document.documentElement.style.overflow = ''
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) closeSidebar()
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

function focusables(root: HTMLElement) {
  return root.querySelectorAll<HTMLElement>(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
}
function focusFirstInPanel() {
  const root = offcanvasEl.value
  if (!root) return
  const els = focusables(root)
  const first = els.item(0)
  if (first) first.focus()
}
function trapFocus(e: KeyboardEvent) {
  const root = offcanvasEl.value
  if (!root) return
  const els = Array.from(focusables(root)).filter(el => !el.hasAttribute('disabled'))
  if (!els.length) return
  const first = els.at(0)
  const last = els.at(-1)
  if (!first || !last) return
  const active = document.activeElement as HTMLElement | null
  if (e.shiftKey) {
    if (active === first || !root.contains(active)) {
      e.preventDefault()
      last.focus()
    }
  } else {
    if (active === last) {
      e.preventDefault()
      first.focus()
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
