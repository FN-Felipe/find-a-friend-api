import { OrgsRepositoryDatabase } from '@/repositories/database/OrgsRepositoryDatabase'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'

export function authenticateFactory() {
  const orgsRepositoryDatabase = new OrgsRepositoryDatabase()
  const authenticateUseCase = new AuthenticateUseCase(orgsRepositoryDatabase)

  return authenticateUseCase
}
