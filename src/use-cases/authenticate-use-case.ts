import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { Org } from '@prisma/client'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'

interface AuthenticateInput {
  email: string
  password: string
}

interface AuthenticateOutput {
  org: Org
}

export class AuthenticateUseCase {
  // eslint-disable-next-line no-useless-constructor, prettier/prettier
  constructor(private orgRepository: IOrgsRepository) { }

  async execute({
    email,
    password,
  }: AuthenticateInput): Promise<AuthenticateOutput> {
    const org = await this.orgRepository.findByEmail(email)
    if (!org) throw new InvalidCredentialsError()

    const doesPasswordMatches = await compare(password, org.password)
    if (!doesPasswordMatches) throw new InvalidCredentialsError()

    return { org }
  }
}
