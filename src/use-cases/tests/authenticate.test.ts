import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { OrgsRepositoryInMemory } from '@/repositories/in-memories/OrgsRepositoryInMemory'
import { AuthenticateUseCase } from '../authenticate-use-case'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgRepositoryInMemory: OrgsRepositoryInMemory
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgRepositoryInMemory = new OrgsRepositoryInMemory()
    sut = new AuthenticateUseCase(orgRepositoryInMemory)
  })

  it('should be able to authenticate', async () => {
    await orgRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
      password: await hash('123456', 6),
    })

    const { org } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    })

    await expect(org.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await orgRepositoryInMemory.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
