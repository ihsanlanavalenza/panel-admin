// server/plugins/mongo.ts
import mongoose from 'mongoose'

let isConnected = false

export default defineNitroPlugin(async () => {
  if (isConnected) return
  const config = useRuntimeConfig()
  const uri = (config as any).mongoUri || process.env.MONGO_URI
  if (!uri) {
    console.warn('[mongo] Missing mongoUri. Set runtimeConfig.mongoUri or MONGO_URI env.')
    return
  }
  try {
    await mongoose.connect(uri, { dbName: process.env.MONGO_DB || 'airnav' })
    isConnected = true
    console.log('[mongo] connected')
  } catch (err) {
    console.error('[mongo] connection error', err)
  }
})
