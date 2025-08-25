export type Permission =
  | 'flights:read'
  | 'alerts:read'
  | 'alerts:ack'
  | 'alerts:resolve'
  | 'analytics:read'
  | 'datasets:read'
  | 'datasets:write'
  | 'users:read'
  | 'users:create'
  | 'users:update'
  | 'users:delete'
  | 'access:update'

export type AppRole = 'INMC_OPERATOR' | 'ADMIN' | 'SUPER_ADMIN' | 'ATC'

export const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  INMC_OPERATOR: ['flights:read', 'alerts:read', 'alerts:ack', 'analytics:read'],
  ATC: ['flights:read', 'alerts:read', 'alerts:ack', 'analytics:read'],
  ADMIN: [
    'flights:read',
    'alerts:read',
    'alerts:ack',
    'alerts:resolve',
    'analytics:read',
    'datasets:read',
    'datasets:write',
    'users:read',
    'users:create',
    'users:update',
    'users:delete',
    'access:update',
  ],
  SUPER_ADMIN: [
    'flights:read',
    'alerts:read',
    'alerts:ack',
    'alerts:resolve',
    'analytics:read',
    'datasets:read',
    'datasets:write',
    'users:read',
    'users:create',
    'users:update',
    'users:delete',
    'access:update',
  ],
}

export function permissionsForRole(role?: AppRole | null) {
  return (role && ROLE_PERMISSIONS[role]) || []
}

export function can(perm: Permission, granted?: Permission[] | null) {
  return !!granted?.includes(perm)
}
