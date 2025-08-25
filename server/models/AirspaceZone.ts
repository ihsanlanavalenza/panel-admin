// server/models/AirspaceZone.ts
import mongoose, { Schema, model } from 'mongoose'

export type ZoneStatus = 'GREEN' | 'YELLOW' | 'RED'

export interface IAirspaceZone {
  _id: mongoose.Types.ObjectId
  name: string
  center: { lat: number; lng: number }
  radiusKm: number
  capacity: number
  status: ZoneStatus
  createdAt: Date
  updatedAt: Date
}

const AirspaceZoneSchema = new Schema<IAirspaceZone>({
  name: { type: String, required: true, unique: true },
  center: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  radiusKm: { type: Number, default: 50 },
  capacity: { type: Number, default: 100 },
  status: { type: String, enum: ['GREEN','YELLOW','RED'], default: 'GREEN' },
}, { timestamps: true })

export const AirspaceZone = mongoose.models.AirspaceZone || model<IAirspaceZone>('AirspaceZone', AirspaceZoneSchema)
