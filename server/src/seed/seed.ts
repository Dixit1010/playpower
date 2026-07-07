import 'dotenv/config'
import { connectDB } from '../db.js'
import { Listing } from '../models/Listing.js'
import fixture from './fixture.json' with { type: 'json' }
import mongoose from 'mongoose'

async function seed() {
  await connectDB()
  await Listing.deleteMany({})
  const listing = await Listing.create(fixture)
  console.log(`Seeded listing ${listing._id}`)
  await mongoose.disconnect()
}

seed()
