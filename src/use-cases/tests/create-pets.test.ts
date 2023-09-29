import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepositoryInMemory } from '@/repositories/in-memories/PetsRepositoryInMemory'
import { CreatePetsUseCase } from '../create-pets-use-case'
import { OrgsRepositoryInMemory } from '@/repositories/in-memories/OrgsRepositoryInMemory'

let petRepository: PetsRepositoryInMemory
let orgsRepository: OrgsRepositoryInMemory
let sut: CreatePetsUseCase

describe('Register Use Case', () => {
  beforeEach(async () => {
    petRepository = new PetsRepositoryInMemory()
    orgsRepository = new OrgsRepositoryInMemory()
    sut = new CreatePetsUseCase(petRepository, orgsRepository)

    await orgsRepository.create({
      id: 'org_1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })
  })

  it('should be able to pet register', async () => {
    const { pets } = await sut.execute({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      org_id: 'org_1',
    })

    await expect(pets.id).toEqual(expect.any(String))
  })
})
