import { PetsRepositoryDatabase } from '@/repositories/database/PetsRepositoryDatabase'
import { FecthPetsByCharacteristcsUseCase } from '@/use-cases/fetch-by-characteristcs-use-case'

export function fetchQueryCharacteristcsFactory() {
  const database = new PetsRepositoryDatabase()
  const useCase = new FecthPetsByCharacteristcsUseCase(database)

  return useCase
}
