import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import jwt from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()
app.register(jwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(cookie)
app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })

  if (env.NODE_ENV !== 'production') console.error(error)
  else {
    /* empty */
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
