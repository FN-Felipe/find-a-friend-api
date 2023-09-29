import { PetsRepositoryDatabase } from '@/repositories/database/PetsRepositoryDatabase'
import { FecthPetsByCityUseCase } from '@/use-cases/fetch-pets-by-city-use-case'

export function fetchPetsByCityFactory() {
  const database = new PetsRepositoryDatabase()
  const useCase = new FecthPetsByCityUseCase(database)

  return useCase
}
