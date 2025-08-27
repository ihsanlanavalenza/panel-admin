// server/models/User.ts
import mongoose, { Schema } from 'mongoose'

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'ATC'
// Extend status to include 'LOCKED' to match client usage; keep 'SUSPENDED' if referenced elsewhere
export type Status = 'ACTIVE' | 'LOCKED' | 'SUSPENDED'

export interface IUser extends mongoose.Document {
  username: string
  email: string
  passwordHash: string
  fullName: string
  role: Role
  status: Status
  loginAttempts: number
  lockUntil?: Date | null
  lastLogin?: Date | null
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true, index: true },
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'ATC'], default: 'ATC' },
  status: { type: String, enum: ['ACTIVE', 'LOCKED', 'SUSPENDED'], default: 'ACTIVE' },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lastLogin: { type: Date, default: null },
}, { timestamps: true })

// Explicit cast prevents union type causing "expression is not callable" on query helpers
export const User: mongoose.Model<IUser> = (mongoose.models.User as mongoose.Model<IUser>)
  || mongoose.model<IUser>('User', UserSchema)
