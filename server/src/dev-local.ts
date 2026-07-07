import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { createApp } from './app.js'
import { Listing } from './models/Listing.js'
import fixture from './seed/fixture.json' with { type: 'json' }

async function main() {
  const mem = await MongoMemoryServer.create()
  await mongoose.connect(mem.getUri())
  await Listing.deleteMany({})
  const listing = await Listing.create(fixture)
  console.log(`[dev-local] seeded in-memory listing ${listing._id}`)

  const app = createApp()
  const port = process.env.PORT ?? 4000
  app.listen(port, () => {
    console.log(`[dev-local] server on port ${port} — in-memory Mongo, no Atlas account needed`)
    console.log(`[dev-local] listing id: ${listing._id}`)
  })
}

main()
