import { Factories } from '@/factories/factories'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createPetsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createPetBody = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    stature: z.string(),
    energy: z.string(),
    ambient: z.string(),
    orgId: z.string(),
  })

  const { name, description, age, stature, energy, ambient, orgId } =
    createPetBody.parse(request.body)

  try {
    const useCase = Factories()
    useCase.createPetsFactory().execute({
      name,
      description,
      age,
      stature,
      energy,
      ambient,
      org_id: orgId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError)
      return replay.status(409).send({ message: 'Error when registering' })

    throw err
  }

  return replay.status(201).send()
}
