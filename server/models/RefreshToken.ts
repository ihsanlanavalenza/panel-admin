// server/models/RefreshToken.ts
import mongoose, { Schema, model } from 'mongoose'

export interface IRefreshToken {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  tokenHash: string
  expiresAt: Date
  createdAt: Date
}

const RefreshTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } })

export const RefreshToken = mongoose.models.RefreshToken || model<IRefreshToken>('RefreshToken', RefreshTokenSchema)
