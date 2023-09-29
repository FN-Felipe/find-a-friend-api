/* eslint-disable camelcase */
import { Pet } from '@prisma/client'
import { IPetsRepository } from '@/repositories/IPetsRepository'
import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetsInput {
  name: string
  description: string
  age: string
  stature: string
  energy: string
  ambient: string
  org_id: string
}

interface CreatePetsOutput {
  pets: Pet
}

export class CreatePetsUseCase {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(private petsRepository: IPetsRepository, private orgRepository: IOrgsRepository) { }

  async execute({
    name,
    description,
    age,
    stature,
    energy,
    ambient,
    org_id,
  }: CreatePetsInput): Promise<CreatePetsOutput> {
    const org = this.orgRepository.findById(org_id)
    if (!org) throw new ResourceNotFoundError()

    const pets = await this.petsRepository.create({
      name,
      description,
      age,
      stature,
      energy,
      ambient,
      org_id,
    })

    return { pets }
  }
}
