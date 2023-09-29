/* eslint-disable camelcase */
import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/IPetsRepository'

interface FetchPetsInput {
  city: string
}

interface FetchPetsOutput {
  pets: Pet[] | null
}

export class FecthPetsByCityUseCase {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(private petsRepository: IPetsRepository) { }

  async execute({ city }: FetchPetsInput): Promise<FetchPetsOutput> {
    const pets = await this.petsRepository.findPetsByCity(city)

    return { pets }
  }
}
