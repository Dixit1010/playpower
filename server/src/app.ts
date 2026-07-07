import express from 'express'
import cors from 'cors'
import { listingRouter } from './routes/listing.js'

export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use('/api/listing', listingRouter)
  return app
}
