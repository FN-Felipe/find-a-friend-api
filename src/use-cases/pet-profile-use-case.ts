import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { IPetsRepository } from '@/repositories/IPetsRepository'

export class PetProfileUseCase {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(private petRepository: IPetsRepository, private orgRepository: IOrgsRepository) { }

  async execute(id: string) {
    const pet = await this.petRepository.findById(id)
    if (!pet) return
    const org = await this.orgRepository.findById(pet.org_id)
    return {
      pet,
      org: {
        phone: org?.phone,
      },
    }
  }
}
