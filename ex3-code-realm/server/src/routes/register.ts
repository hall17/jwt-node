import { Router } from 'express'
import { LEGAL_TCP_SOCKET_OPTIONS } from 'mongodb'
import { logIn } from '../auth'
import { guest } from '../middleware'
import { User } from '../models'
import { registerSchema } from '../validation'
const router = Router()

router.post('/register', guest,async (req, res) => {
  console.log(req.body)

  await registerSchema.validateAsync(req.body, { abortEarly: false })

  const { email, name, password } = req.body

  const found = await User.exists({ email })

  if (found) {
    throw new Error('Invalid email')
  }

  const user = await User.create({
    email,
    name,
    password,
  })

  logIn(req,user.id)


  res.json({ message: 'ok' })
})

export default router
