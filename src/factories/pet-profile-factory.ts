import { OrgsRepositoryDatabase } from '@/repositories/database/OrgsRepositoryDatabase'
import { PetsRepositoryDatabase } from '@/repositories/database/PetsRepositoryDatabase'
import { PetProfileUseCase } from '@/use-cases/pet-profile-use-case'

export function petProfileFactory() {
  const database = new PetsRepositoryDatabase()
  const orgRepository = new OrgsRepositoryDatabase()
  const useCase = new PetProfileUseCase(database, orgRepository)

  return useCase
}
