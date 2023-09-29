import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const email = `john${randomUUID()}@mail.com`
  await prisma.org.create({
    data: {
      name: 'John Doe',
      email,
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999997',
      city: 'Jaboticabal',
      password: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: '123456',
  })
  const { token } = authResponse.body
  return {
    token,
  }
}
