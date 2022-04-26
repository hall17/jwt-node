import express from 'express'
import session, { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register } from './routes'

declare module 'express-session' {
  export interface SessionData {
    userId: string
  }
}
export const createApp = (store: Store) => {
  const app = express()

  app.use(express.json())

  app.use(
    session({
      ...SESSION_OPTIONS,
      store,
    })
  )

  app.use(register)

  return app
}
