import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { works } from './db/schema'
import { getDb } from './db/client'

const app = new Hono()
  app.use('*', cors({
    origin: '*',
  }))

  app.get('/hello', (c) => {
    return c.json({ message: 'Hello Hono!' })
  })


  app.get('/api/works', async (c) => {
   const db = getDb(c.env.DB);
   const allWorks = await db.select().from(works);
   return c.json({ works: allWorks });
})


export type AppType = typeof app
export default app
