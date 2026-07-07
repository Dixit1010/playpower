import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getMongoClient } from './_lib/mongo'
import fixture from './_lib/fixture.json'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await getMongoClient()
    const collection = client.db().collection('listings')

    let listing = await collection.findOne({})
    if (!listing) {
      const result = await collection.insertOne(fixture)
      listing = { _id: result.insertedId, ...fixture }
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
    res.status(200).json(listing)
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
