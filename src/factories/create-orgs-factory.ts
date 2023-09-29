import { OrgsRepositoryDatabase } from '@/repositories/database/OrgsRepositoryDatabase'
import { CreateOrgUseCase } from '@/use-cases/create-orgs-use-case'

export function createOrgsFactory() {
  const orgsDatabase = new OrgsRepositoryDatabase()
  const useCase = new CreateOrgUseCase(orgsDatabase)

  return useCase
}
