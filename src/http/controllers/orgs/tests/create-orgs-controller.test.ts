import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'

describe('Create Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create org', async () => {
    const email = `john${randomUUID()}@example.com`

    const response = await request(app.server).post('/orgs').send({
      name: 'John Doe',
      email,
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })

    expect(response.statusCode).toEqual(201)
  })
})
