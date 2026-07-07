import { Router } from 'express'
import { Listing } from '../models/Listing.js'

export const listingRouter = Router()

listingRouter.get('/', async (_req, res) => {
  const listing = await Listing.findOne()
  if (!listing) {
    res.status(404).json({ error: 'No listing seeded yet — run the seed script' })
    return
  }
  res.json(listing)
})
