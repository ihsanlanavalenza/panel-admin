<template>
  <!-- Adjusted top padding after removing layout's own top padding (was too tall) -->
  <!-- Further reduced top padding for less empty space at top -->
  <section class="px-4 pt-2 md:pt-4 lg:pt-4 xl:pt-6">
    <div class="max-w-7xl mx-auto">
  <header class="mb-8">
        <!-- Top meta / breadcrumb (optional) -->
        <nav class="text-xs font-medium text-gray-400 flex items-center gap-2 mb-4">
          <span>Admin</span>
          <span class="opacity-40">/</span>
          <span class="text-gray-300">Users</span>
        </nav>
        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-semibold tracking-tight text-white">Users Management</h1>
            <p class="mt-3 text-gray-300 text-sm md:text-[15px] leading-relaxed max-w-2xl">
              Create, update and control user accounts. Assign roles, manage status (active / locked) and keep the system secure.
            </p>
          </div>
          <div class="flex items-center gap-3 md:pb-1">
            <button class="btn btn-primary btn-elev" @click="openCreate()" title="Create new user">
              <span class="icon">➕</span>
              <span class="label">New User</span>
            </button>
          </div>
        </div>
        <div class="mt-8 border-b border-white/10"></div>
      </header>

    <div v-if="error" class="alert alert-error">{{ error }}</div>
    <div v-if="success" class="alert alert-success">{{ success }}</div>

    <!-- Mobile card list -->
    <div class="sm:hidden space-y-3 mb-6">
      <div v-for="u in users" :key="u._id" class="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-semibold text-white">@{{ u.username }}</h3>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded" :class="u.role === 'SUPER_ADMIN' ? 'bg-purple-600/30 text-purple-200' : 'bg-blue-600/30 text-blue-200'">{{ u.role }}</span>
        </div>
        <p class="text-xs text-gray-300 mb-1">{{ u.fullName }}</p>
        <p class="text-[11px] text-gray-400 mb-3 truncate">{{ u.email }}</p>
        <div class="flex items-center gap-2 mb-3">
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded" :class="u.status === 'ACTIVE' ? 'bg-green-600/25 text-green-200' : 'bg-yellow-600/25 text-yellow-200'">{{ u.status }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-edit text-xs" @click="openEdit(u)">✏️ Edit</button>
          <button class="btn btn-lock text-xs" :title="u.status === 'ACTIVE' ? 'Lock user' : 'Unlock user'" @click="toggleLock(u)">
            <span v-if="u.status === 'ACTIVE'">🔒 Lock</span>
            <span v-else>🔓 Unlock</span>
          </button>
          <button class="btn btn-delete text-xs" :disabled="!isSuperAdmin" title="Delete user" @click="remove(u)">🗑️ Delete</button>
        </div>
      </div>
    </div>

  <div class="card px-0 overflow-x-auto hidden sm:block">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-300">
            <th class="py-2 px-3">Username</th>
            <th class="py-2 px-3">Full Name</th>
            <th class="py-2 px-3">Email</th>
            <th class="py-2 px-3">Role</th>
            <th class="py-2 px-3">Status</th>
            <th class="py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="u._id" class="border-t border-white/10">
            <td class="py-2 px-3 text-white">{{ u.username }}</td>
            <td class="py-2 px-3 text-gray-200">{{ u.fullName }}</td>
            <td class="py-2 px-3 text-gray-300">{{ u.email }}</td>
            <td class="py-2 px-3">
              <span class="text-xs font-semibold px-2 py-1 rounded" :class="u.role === 'SUPER_ADMIN' ? 'bg-purple-600/20 text-purple-200' : 'bg-blue-600/20 text-blue-200'">
                {{ u.role }}
              </span>
            </td>
            <td class="py-2 px-3">
              <span class="text-xs font-semibold px-2 py-1 rounded" :class="u.status === 'ACTIVE' ? 'bg-green-600/20 text-green-200' : 'bg-yellow-600/20 text-yellow-200'">
                {{ u.status }}
              </span>
            </td>
            <td class="py-2 px-3 actions-cell">
              <div class="flex items-center gap-2">
                <button class="btn btn-edit text-sm" @click="openEdit(u)">✏️ Edit</button>
                <button
                  class="btn btn-lock text-sm"
                  :title="u.status === 'ACTIVE' ? 'Lock user' : 'Unlock user'"
                  @click="toggleLock(u)"
                >
                  <span v-if="u.status === 'ACTIVE'">🔒 Lock</span>
                  <span v-else>🔓 Unlock</span>
                </button>
                <button
                  class="btn btn-delete text-sm"
                  :disabled="!isSuperAdmin"
                  title="Delete user"
                  @click="remove(u)"
                >🗑️ Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!loading && users.length === 0" class="text-gray-400 text-sm py-4">No users found.</div>
      <div v-if="loading" class="text-gray-400 text-sm py-4">Loading...</div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="card w-full max-w-md">
        <h2 class="text-xl font-semibold text-white mb-4">Create User</h2>
        <form @submit.prevent="createUser">
          <div class="grid gap-3">
            <div>
              <label class="form-label">Username</label>
              <input class="form-input" v-model="createForm.username" required />
            </div>
            <div>
              <label class="form-label">Email</label>
              <input class="form-input" type="email" v-model="createForm.email" required />
            </div>
            <div>
              <label class="form-label">Full Name</label>
              <input class="form-input" v-model="createForm.fullName" required />
            </div>
            <div>
              <label class="form-label">Password</label>
              <input class="form-input" type="password" v-model="createForm.password" required />
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <label class="form-label">Role</label>
                <select class="form-input" v-model="createForm.role">
                  <option value="ATC">ATC</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="form-label">Status</label>
                <select class="form-input" v-model="createForm.status">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="LOCKED">LOCKED</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-5 flex justify-end gap-2">
            <button type="button" class="btn" @click="closeCreate">Cancel</button>
            <button type="submit" class="btn">Create</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEdit" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="card w-full max-w-md">
        <h2 class="text-xl font-semibold text-white mb-4">Edit User</h2>
        <form @submit.prevent="saveEdit">
          <div class="grid gap-3">
            <div>
              <label class="form-label">Full Name</label>
              <input class="form-input" v-model="editForm.fullName" required />
            </div>
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <label class="form-label">Role</label>
                <select class="form-input" v-model="editForm.role">
                  <option value="ATC">ATC</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>
              <div class="flex-1">
                <label class="form-label">Status</label>
                <select class="form-input" v-model="editForm.status">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="LOCKED">LOCKED</option>
                </select>
              </div>
            </div>
          </div>
          <div class="mt-5 flex justify-end gap-2">
            <button type="button" class="btn" @click="closeEdit">Cancel</button>
            <button type="submit" class="btn">Save</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  </section>
</template>

<script setup>
useHead({ title: 'Users - Admin' })
definePageMeta({ layout: 'admin', middleware: ['auth','perm'], requiredPermissions: ['users:read'] })

import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const loading = ref(false)
const users = ref([])
const error = ref('')
const success = ref('')

const tokenCookie = useCookie('accessToken')
const headers = computed(() => tokenCookie.value ? { Authorization: `Bearer ${tokenCookie.value}` } : {})
const isSuperAdmin = computed(() => auth.user?.role === 'SUPER_ADMIN')

onMounted(async () => {
  await auth.checkAuth()
  await loadUsers()
})

async function loadUsers() {
  loading.value = true
  error.value = ''
  try {
    const res = await $fetch('/api/admin/users', { headers: headers.value })
    users.value = res.users || []
  } catch (e) {
    const msg = (e && e.data?.message) || e.message || 'Failed to load users'
    error.value = msg
    if (e?.status === 401 || e?.status === 403) navigateTo('/login')
  } finally {
    loading.value = false
  }
}

// Create
const showCreate = ref(false)
const createForm = reactive({ username: '', email: '', fullName: '', password: '', role: 'ATC', status: 'ACTIVE' })
function openCreate() { showCreate.value = true }
function closeCreate() { showCreate.value = false; Object.assign(createForm, { username: '', email: '', fullName: '', password: '', role: 'ATC', status: 'ACTIVE' }) }
async function createUser() {
  error.value = ''
  success.value = ''
  try {
    await $fetch('/api/admin/users', { method: 'POST', headers: headers.value, body: createForm })
    success.value = 'User created.'
    closeCreate()
    await loadUsers()
  } catch (e) {
    error.value = (e && e.data?.message) || e.message || 'Failed to create user'
  }
}

// Edit
const showEdit = ref(false)
const editingUserId = ref('')
const editForm = reactive({ fullName: '', role: 'ATC', status: 'ACTIVE' })
function openEdit(u) {
  editingUserId.value = u._id
  Object.assign(editForm, { fullName: u.fullName, role: u.role, status: u.status })
  showEdit.value = true
}
function closeEdit() { showEdit.value = false }
async function saveEdit() {
  error.value = ''
  success.value = ''
  try {
    await $fetch(`/api/admin/users/${editingUserId.value}`, { method: 'PUT', headers: headers.value, body: editForm })
    success.value = 'User updated.'
    closeEdit()
    await loadUsers()
  } catch (e) {
    error.value = (e && e.data?.message) || e.message || 'Failed to update user'
  }
}

// Lock/Unlock
async function toggleLock(u) {
  const next = u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE'
  try {
    await $fetch(`/api/admin/users/${u._id}`, { method: 'PUT', headers: headers.value, body: { fullName: u.fullName, role: u.role, status: next } })
    success.value = `User ${next === 'LOCKED' ? 'locked' : 'unlocked'}.`
    await loadUsers()
  } catch (e) {
    error.value = (e && e.data?.message) || e.message || 'Failed to update status'
  }
}

// Delete
async function remove(u) {
  if (!isSuperAdmin.value) return
  if (!confirm(`Delete user ${u.username}?`)) return
  try {
    await $fetch(`/api/admin/users/${u._id}`, { method: 'DELETE', headers: headers.value })
    success.value = 'User deleted.'
    await loadUsers()
  } catch (e) {
    error.value = (e && e.data?.message) || e.message || 'Failed to delete user'
  }
}
</script>

<style scoped>
.px-2 { padding-left: .5rem; padding-right: .5rem; }
table th, table td { white-space: nowrap; }
@media (max-width: 640px) {
  table th:nth-child(3), table td:nth-child(3) { display: none; } /* hide email on very small */
}
.bg-glass { background: rgba(255,255,255,0.04); }
</style>

<style scoped>
/* Action button variants */
.btn-lock { background: rgba(234,179,8,0.18); border:1px solid rgba(234,179,8,0.35); color:#fde68a; }
.btn-lock:hover { background: rgba(234,179,8,0.28); }
.btn-delete { background: rgba(220,38,38,0.18); border:1px solid rgba(220,38,38,0.35); color:#fca5a5; }
.btn-delete:hover { background: rgba(220,38,38,0.28); }
.btn-delete:disabled { opacity:.4; cursor:not-allowed; }
.btn-edit { background: rgba(37,99,235,0.18); border:1px solid rgba(37,99,235,0.4); color:#93c5fd; }
.btn-edit:hover { background: rgba(37,99,235,0.28); }
/* Dashboard link styling */
.dash-link { display:inline-flex; align-items:center; gap:6px; padding:8px 14px; border:1px solid rgba(255,255,255,0.12); border-radius:10px; background:linear-gradient(145deg,rgba(30,58,138,.35),rgba(29,78,216,.15)); color:#bfdbfe; font-weight:500; text-decoration:none; backdrop-filter:blur(4px); transition:background .18s ease, border-color .18s ease, transform .18s ease; }
.dash-link:hover { background:linear-gradient(145deg,rgba(30,58,138,.5),rgba(29,78,216,.25)); border-color:rgba(255,255,255,.25); }
.dash-link:active { transform:translateY(1px); }
.dash-link:focus-visible { outline:2px solid #60a5fa; outline-offset:2px; }
.dash-link .icon { font-size:16px; line-height:1; }
/* Primary button (New User) */
.btn-primary { display:inline-flex; align-items:center; gap:6px; padding:8px 16px; border:1px solid rgba(59,130,246,0.4); border-radius:10px; background:linear-gradient(145deg,rgba(2,132,199,.35),rgba(14,165,233,.2)); color:#e0f2fe; font-weight:500; backdrop-filter:blur(4px); transition:background .18s ease,border-color .18s ease,transform .18s ease; }
.btn-primary:hover { background:linear-gradient(145deg,rgba(2,132,199,.55),rgba(14,165,233,.32)); border-color:rgba(125,211,252,.6); }
.btn-primary:active { transform:translateY(1px); }
.btn-primary:focus-visible { outline:2px solid #38bdf8; outline-offset:2px; }
.btn-primary .icon { font-size:15px; }
/* Extra vertical spacing for action buttons */
.actions-cell { padding-top: 1rem !important; padding-bottom: 1rem !important; }
.actions-cell .btn { padding-top: 0.55rem; padding-bottom: 0.55rem; }
/* Section background unify */
section { background: transparent; }

/* Professional header tweaks */
.btn-elev { transition:background .18s ease, transform .18s ease, box-shadow .18s ease; }
.btn-elev:hover { transform:translateY(-2px); box-shadow:0 6px 18px -6px rgba(0,0,0,.55); }
.btn-elev:active { transform:translateY(-1px); }
</style>
