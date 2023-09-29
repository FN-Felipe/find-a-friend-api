/* eslint-disable camelcase */
import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/IPetsRepository'

interface FetchByCaracteristcsInput {
  city: string
  age?: string
  stature?: string
  energy?: string
  ambient?: string
  pets: Pet[]
}

interface FetchByCaracteristcsOutput {
  _pets: Pet[] | null
}

export class FecthPetsByCharacteristcsUseCase {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(private petsRepository: IPetsRepository) { }

  async execute({
    city,
    pets,
    age,
    stature,
    energy,
    ambient,
  }: FetchByCaracteristcsInput): Promise<FetchByCaracteristcsOutput> {
    const _pets = await this.petsRepository.searchMany(
      city,
      pets,
      age,
      stature,
      energy,
      ambient,
    )
    return { _pets }
  }
}
