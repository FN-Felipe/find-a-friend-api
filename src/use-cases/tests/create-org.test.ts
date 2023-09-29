import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { CreateOrgUseCase } from '../create-orgs-use-case'
import { OrgsRepositoryInMemory } from '@/repositories/in-memories/OrgsRepositoryInMemory'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'

let orgsRepository: OrgsRepositoryInMemory
let sut: CreateOrgUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    orgsRepository = new OrgsRepositoryInMemory()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to register', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })

    await expect(org.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password)

    await expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@mail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        address: 'Avenida Tiradentes',
        cep: '14870-020',
        phone: '16999999999',
        city: 'Jaboticabal',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
