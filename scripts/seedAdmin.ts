// scripts/seedAdmin.ts
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../server/models/User'

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/airnav'
  await mongoose.connect(uri)

  const adminPassword = await bcrypt.hash('Admin123!', 12)
  const atcPassword = await bcrypt.hash('Atc123!', 12)

  const superAdmin = await User.findOneAndUpdate(
    { username: 'superadmin' },
    {
      username: 'superadmin',
      email: 'admin@airspace.id',
      passwordHash: adminPassword,
      fullName: 'Super Admin',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
    },
    { new: true, upsert: true }
  )

  const atc = await User.findOneAndUpdate(
    { username: 'atc1' },
    {
      username: 'atc1',
      email: 'atc1@airspace.id',
      passwordHash: atcPassword,
      fullName: 'ATC Satu',
      role: 'ATC',
      status: 'ACTIVE',
    },
    { new: true, upsert: true }
  )

  console.log('Seeded users:', { superAdmin: superAdmin?.toObject?.() ?? superAdmin, atc: atc?.toObject?.() ?? atc })
  await mongoose.disconnect()
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
