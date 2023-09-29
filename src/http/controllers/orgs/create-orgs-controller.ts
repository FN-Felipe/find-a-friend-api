import { Factories } from '@/factories/factories'
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createOrgsController(
  request: FastifyRequest,
  replay: FastifyReply,
) {
  const createBody = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
    cep: z.string(),
    phone: z.string(),
    city: z.string(),
  })

  const { address, cep, city, email, name, password, phone } = createBody.parse(
    request.body,
  )

  try {
    const useCase = Factories()
    useCase
      .createOrgsFactory()
      .execute({ address, cep, city, email, name, password, phone })
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError)
      return replay.status(409).send({ message: 'E-mail already exists' })

    throw err
  }

  return replay.status(201).send()
}
