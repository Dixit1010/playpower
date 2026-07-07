import 'dotenv/config'
import { createApp } from './app.js'
import { connectDB } from './db.js'

const app = createApp()
const port = process.env.PORT ?? 4000

connectDB().then(() => {
  app.listen(port, () => console.log(`Server listening on port ${port}`))
})
