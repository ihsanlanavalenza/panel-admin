import mongoose, { Schema } from 'mongoose'

export type AlertStatus = 'OPEN' | 'ACK' | 'RESOLVED'

const AlertSchema = new Schema({
  title: { type: String, required: true },
  zoneName: { type: String },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' },
  status: { type: String, enum: ['OPEN','ACK','RESOLVED'], default: 'OPEN', index: true },
  ackBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  resolveBy: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  metadata: { type: Schema.Types.Mixed }
}, { timestamps: true })

export const Alert = (mongoose.models.Alert as mongoose.Model<any>) || mongoose.model('Alert', AlertSchema)
