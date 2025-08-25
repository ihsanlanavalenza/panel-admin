// server/models/User.ts
import mongoose, { Schema, model } from 'mongoose'

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'ATC'
export type Status = 'ACTIVE' | 'SUSPENDED'

export interface IUser {
  _id: mongoose.Types.ObjectId
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
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED'], default: 'ACTIVE' },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },
  lastLogin: { type: Date, default: null },
}, { timestamps: true })

export const User = mongoose.models.User || model<IUser>('User', UserSchema)
