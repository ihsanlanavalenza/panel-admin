// server/utils/guard.ts
import { verify } from './jwt'
import { User, type IUser, type Role } from '../models/User'
import { permissionsForRole } from '../../utils/permissions'

export async function requireAuth(event: any): Promise<IUser> {
  const auth = getHeader(event, 'authorization')
  if (!auth) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const token = auth.replace('Bearer ', '')
  const payload = verify(token)
  if (!payload || typeof payload !== 'object' || !('userId' in payload)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  const user = await User.findById((payload as any).userId)
  if (!user || user.status !== 'ACTIVE') {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
  return user.toObject() as unknown as IUser
}

export async function requireRole(event: any, roles: Role[]): Promise<IUser> {
  const user = await requireAuth(event)
  if (!roles.includes(user.role)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  return user
}

export async function requirePermission(event: any, perm: string): Promise<IUser> {
  const user = await requireAuth(event)
  const perms = permissionsForRole(user.role as any)
  if (!perms.includes(perm as any)) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
  // attach for downstream if needed
  ;(event as any).context.user = { ...user, permissions: perms }
  return user
}
