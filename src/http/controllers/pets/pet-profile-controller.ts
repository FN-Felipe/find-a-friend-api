import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { Factories } from '@/factories/factories'

export async function petProfile(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const petProfileParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = petProfileParamsSchema.parse(request.params)

  const petProfileUseCase = Factories()
  const response = await petProfileUseCase.petProfileFactory().execute(id)

  return replay.status(201).send(response)
}
