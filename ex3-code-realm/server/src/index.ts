import mongoose from 'mongoose'
import session from 'express-session'
import connectRedis from 'connect-redis'
import Redis from 'ioredis'
import { REDIS_OPTIONS, SESSION_OPTIONS, PORT } from './config'

import { MONGO_URI } from './config/db'
import { createApp } from './app'

// defensive semicolumn
;(async () => {
  await mongoose.connect(MONGO_URI)

  const RedisStore = connectRedis(session)

  const client = new Redis(REDIS_OPTIONS)

  const store = new RedisStore({ client })

  const app = createApp(store)

  app.listen(PORT, () => console.log('running on port ', PORT))
})()
