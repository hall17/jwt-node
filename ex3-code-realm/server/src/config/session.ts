import { SessionOptions } from 'express-session'
import { IN_PROD } from './app'

const HALF_HOUR = 1000 * 60 * 30

const {
  SESSION_SECRET = 'keep it secret',
  SESSION_NAME = 'sid',
  SESSION_IDLE_TIMEOUT = HALF_HOUR,
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: IN_PROD,
    sameSite: true,
  },
  rolling: true, // extend timeout - update the cookie at every request
  resave: false, // update time to live
  saveUninitialized: false,
}
