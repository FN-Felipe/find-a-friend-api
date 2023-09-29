import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Factories } from '@/factories/factories'

export async function fetchPetsByCity(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const fetchPetsByCityParamsSchema = z.object({
    city: z.string(),
  })

  const fetchPetsQuerySchema = z.object({
    age: z.string(),
    stature: z.string(),
    energy: z.string(),
    ambient: z.string(),
  })

  const { city } = fetchPetsByCityParamsSchema.parse(request.params)
  const { age, ambient, energy, stature } = fetchPetsQuerySchema.parse(
    request.query,
  )

  const fetchFactoryUseCase = Factories()
  const { pets } = await fetchFactoryUseCase
    .fetchPetsByCityFactory()
    .execute({ city })

  if (!pets) return null

  if (!age || !ambient || !energy || !stature) {
    return replay.status(201).send({ pets })
  }

  const { _pets } = await fetchFactoryUseCase
    .fetchQueryCharacteristcsFactory()
    .execute({ age, ambient, energy, stature, pets, city })

  return replay.status(200).send(_pets)
}
