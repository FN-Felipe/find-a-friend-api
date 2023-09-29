import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

describe('Create Pets [e2e]', () => {
  beforeAll(async () => {
    await app.ready()
    // await createAndAuthenticateUser(app, true)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create pet', async () => {
    const email = `john${randomUUID()}@example.com`
    const org = await prisma.org.create({
      data: {
        name: 'John Doe',
        email,
        password: '123456',
        address: 'Avenida Tiradentes',
        cep: '14870-020',
        phone: '16999999999',
        city: 'Jaboticabal',
      },
    })

    const response = await request(app.server).post(`/${org.id}/pets`).send({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      orgId: org.id,
    })

    expect(response.statusCode).toEqual(201)
  })
})
