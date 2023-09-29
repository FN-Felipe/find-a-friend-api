import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  create(data: Prisma.PetCreateManyInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findPetsByCity(city: string): Promise<Pet[] | null>
  searchMany(
    city: string,
    pets: Pet[],
    age?: string,
    stature?: string,
    energy?: string,
    ambient?: string,
  ): Promise<Pet[]>
}
