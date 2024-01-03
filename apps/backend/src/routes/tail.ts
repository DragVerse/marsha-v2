import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { object, z } from 'zod'

import { ERROR_MESSAGE } from '@/helpers/constants'

type Bindings = {
  LOGTAIL_API_KEY: string
}

const app = new Hono<{ Bindings: Bindings }>()
const corsConfig = {
  origin: ['https://tape.xyz', 'https://www.tape.xyz'],
  allowHeaders: ['*'],
  allowMethods: ['POST', 'OPTIONS'],
  maxAge: 600
}
app.use('*', cors(corsConfig))

const logtailApiURL = 'https://in.logtail.com/'
const validationSchema = object({
  source: z.string(),
  level: z.string().nullable().optional(),
  message: z.string().nullable().optional()
})
type RequestInput = z.infer<typeof validationSchema>

app.post('/', zValidator('json', validationSchema), async (c) => {
  try {
    const body = await c.req.json<RequestInput>()
    const LOGTAIL_API_KEY = c.env.LOGTAIL_API_KEY
    const result = await fetch(logtailApiURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${LOGTAIL_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Tape'
      },
      body: JSON.stringify(body)
    })
    if (!result.ok) {
      return c.json({ success: false, message: ERROR_MESSAGE })
    }
    return c.json({ success: true })
  } catch {
    return c.json({ success: false, message: ERROR_MESSAGE })
  }
})

export default app
