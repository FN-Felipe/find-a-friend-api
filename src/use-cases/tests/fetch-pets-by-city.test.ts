import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepositoryInMemory } from '@/repositories/in-memories/PetsRepositoryInMemory'
import { FecthPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

let petRepository: PetsRepositoryInMemory
let sut: FecthPetsByCityUseCase

describe('Fetch pets', () => {
  beforeEach(async () => {
    petRepository = new PetsRepositoryInMemory()
    sut = new FecthPetsByCityUseCase(petRepository)

    await petRepository.create({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      org_id: 'org_1',
    })

    await petRepository.create({
      name: 'Mingal',
      description: 'Gato pregiçoso. Ama comer',
      age: '5 anos',
      stature: 'Pequena',
      energy: 'Baixa',
      ambient: 'Apartamento',
      org_id: 'org_1',
    })

    await petRepository.create({
      name: 'Poly',
      description:
        'É bem peluda, brincalhona, aprende os comandos muito rápido e cheia de energia',
      age: '2 anos',
      stature: 'Média',
      energy: 'Alta',
      ambient: 'Ambiente amplo',
      org_id: 'org_2',
    })

    await petRepository.create({
      name: 'Mingal',
      description: 'Gato pregiçoso. Ama comer',
      age: '5 anos',
      stature: 'Pequena',
      energy: 'Baixa',
      ambient: 'Apartamento',
      org_id: 'org_2',
    })

    await petRepository.create({
      name: 'João',
      description: 'É um cachorro muito dócil',
      age: '10 anos',
      stature: 'Pequena',
      energy: 'Baixa',
      ambient: 'Apartamento',
      org_id: 'org_2',
    })
  })

  it('should be able to pet filter by city', async () => {
    const { pets } = await sut.execute({ city: 'Jaboticabal' })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ org_id: 'org_1' }),
      expect.objectContaining({ org_id: 'org_1' }),
    ])
  })
})
