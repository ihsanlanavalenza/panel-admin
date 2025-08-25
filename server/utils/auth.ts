// server/utils/auth.ts
import { User } from '../models/User'

export async function isLocked(user: any) {
  if (!user.lockUntil) return false
  return user.lockUntil > new Date()
}

export async function incLoginAttempts(user: any) {
  const attempts = (user.loginAttempts || 0) + 1
  let lockUntil = user.lockUntil
  if (attempts >= 5) {
    lockUntil = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 jam
  }
  await User.updateOne({ _id: user._id }, { $set: { loginAttempts: attempts, lockUntil } })
}

export async function resetLoginAttempts(user: any) {
  await User.updateOne({ _id: user._id }, { $set: { loginAttempts: 0, lockUntil: null } })
}
