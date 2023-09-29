import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../IPetsRepository'
import { prisma } from '@/lib/prisma'

export class PetsRepositoryDatabase implements IPetsRepository {
  async create(data: Prisma.PetCreateManyInput) {
    const pet = await prisma.pet.create({ data })
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async findPetsByCity(city: string) {
    const pets: Pet[] = []
    const allPets = await prisma.pet.findMany()

    const orgsByCity = await prisma.org.findMany({
      where: { city },
    })

    for await (const org of orgsByCity) {
      allPets.filter((pet) => pet.org_id === org.id && pets.push(pet))
    }

    return pets
  }

  async searchMany(
    city: string,
    pets: Pet[],
    age?: string,
    stature?: string,
    energy?: string,
    ambient?: string,
  ) {
    const petArr: Pet[] = []

    if (age) pets.filter((item) => item.age === age && petArr.push(item))
    if (stature)
      pets.filter((item) => item.stature === stature && petArr.push(item))
    if (energy)
      pets.filter((item) => item.energy === energy && petArr.push(item))
    if (ambient)
      pets.filter((item) => item.ambient === ambient && petArr.push(item))

    return petArr
  }

  // async searchMany(
  //   city: string,
  //   pets?: Pet[],
  //   age?: string,
  //   stature?: string,
  //   energy?: string,
  //   ambient?: string,
  // ) {
  //   const orgs = await prisma.org.findMany({ where: { city } })

  //   const _pets: Pet[] = []

  //   orgs.map(async (org) => {
  //     const where = { org_id: org.id }

  //     if (age) Object.assign(where, { age })
  //     if (stature) Object.assign(where, { stature })
  //     if (energy) Object.assign(where, { energy })
  //     if (ambient) Object.assign(where, { ambient })

  //     const response = await prisma.pet.findMany({ where })
  //     response.map((item) => _pets.push(item))
  //   })

  //   return _pets
  // }
}
