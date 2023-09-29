import { FastifyInstance } from 'fastify'
import { createOrgsController } from './create-orgs-controller'
import { authenticate } from './authenticate'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', createOrgsController)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
