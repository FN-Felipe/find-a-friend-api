import { FastifyInstance } from 'fastify'
import { createPetsController } from './create-pets-controller'
import { fetchPetsByCity } from './fetch-pets-by-city-controller'
import { petProfile } from './pet-profile-controller'
import { fetchPetsByCharacteristics } from './fetch-query-characteristcs-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:city', fetchPetsByCity)
  app.get('/pets/:city/characteristcs', fetchPetsByCharacteristics)
  app.get('/pet/:id', petProfile)

  app.post('/:orgId/pets', createPetsController)
}
