import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepositoryInMemory } from '@/repositories/in-memories/PetsRepositoryInMemory'
import { PetProfileUseCase } from '../pet-profile-use-case'
import { OrgsRepositoryInMemory } from '@/repositories/in-memories/OrgsRepositoryInMemory'

let petRepository: PetsRepositoryInMemory
let orgRepository: OrgsRepositoryInMemory
let sut: PetProfileUseCase

describe('Pet Profile Use Case', () => {
  beforeEach(async () => {
    petRepository = new PetsRepositoryInMemory()
    orgRepository = new OrgsRepositoryInMemory()
    sut = new PetProfileUseCase(petRepository, orgRepository)
  })

  it('should be able to pet profile by id', async () => {
    const _pet = await petRepository.create({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      org_id: 'org_1',
    })

    const response = await sut.execute(_pet.id)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(response?.pet.id).toEqual(expect.any(String))
  })

  it('should be able to WhatsApp org', async () => {
    const org = await orgRepository.create({
      id: 'org_1',
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      address: 'Avenida Tiradentes',
      cep: '14870-020',
      phone: '16999999999',
      city: 'Jaboticabal',
    })

    const _pet = await petRepository.create({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      org_id: org.id,
    })

    const response = await sut.execute(_pet.id)

    expect(response?.org?.phone).toEqual(expect.any(String))
  })
})
