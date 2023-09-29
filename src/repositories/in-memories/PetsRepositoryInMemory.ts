import { Prisma, Pet, Org } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IPetsRepository } from '../IPetsRepository'

export class PetsRepositoryInMemory implements IPetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetCreateManyInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      age: data.age,
      stature: data.stature,
      energy: data.energy,
      ambient: data.ambient,
      org_id: data.org_id,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string) {
    const pets = this.pets.find((item) => item.id === id)
    if (!pets) return null

    return pets
  }

  async findPetsByCity(city: string) {
    const petByCity: Pet[] = []

    const orgs: Org[] = [
      {
        id: 'org_1',
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: '123456',
        address: 'Avenida Tiradentes',
        cep: '14870-020',
        phone: '16999999999',
        city: 'Jaboticabal',
        role: 'MEMBER',
        created_at: new Date(),
      },
      {
        id: 'org_2',
        name: 'Doe John',
        email: 'doejohn@mail.com',
        password: '123456',
        address: 'Avenida Tiradentes',
        cep: '14870-020',
        phone: '16999999999',
        city: 'Bebedouro',
        role: 'MEMBER',
        created_at: new Date(),
      },
    ]

    const _orgs = orgs.filter((item) => item.city === city)

    for await (const org of _orgs) {
      this.pets.filter((pet) => pet.org_id === org.id && petByCity.push(pet))
    }

    return petByCity
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
}
