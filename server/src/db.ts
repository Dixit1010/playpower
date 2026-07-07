import mongoose from 'mongoose'

export async function connectDB() {
  const uri = process.env.MONGO_URI
  if (!uri) {
    throw new Error('MONGO_URI is not set — add it to server/.env before starting the server')
  }
  await mongoose.connect(uri)
  console.log('MongoDB connected')
}
