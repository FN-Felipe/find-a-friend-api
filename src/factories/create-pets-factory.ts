import { OrgsRepositoryDatabase } from '@/repositories/database/OrgsRepositoryDatabase'
import { PetsRepositoryDatabase } from '@/repositories/database/PetsRepositoryDatabase'
import { CreatePetsUseCase } from '@/use-cases/create-pets-use-case'

export function createPetsFactory() {
  const database = new PetsRepositoryDatabase()
  const orgRepository = new OrgsRepositoryDatabase()
  const useCase = new CreatePetsUseCase(database, orgRepository)

  return useCase
}
