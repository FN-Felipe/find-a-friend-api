import { beforeEach, describe, expect, it } from 'vitest'
import { PetsRepositoryInMemory } from '@/repositories/in-memories/PetsRepositoryInMemory'
import { FecthPetsByCharacteristcsUseCase } from '../fetch-by-characteristcs-use-case'
import { prisma } from '@/lib/prisma'

let petRepository: PetsRepositoryInMemory
let sut: FecthPetsByCharacteristcsUseCase

describe('Fetch by characteristcs', () => {
  beforeEach(async () => {
    petRepository = new PetsRepositoryInMemory()
    sut = new FecthPetsByCharacteristcsUseCase(petRepository)

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
      stature: 'Pequeno',
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
    const pets = await prisma.pet.findMany()
    const { age, stature } = { age: '5 anos', stature: 'Media' }
    const { _pets } = await sut.execute({ age, stature, pets })
    expect(_pets).toEqual(expect.any(Array))
  })
})
