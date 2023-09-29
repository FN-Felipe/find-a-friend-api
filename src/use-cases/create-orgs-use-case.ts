/* eslint-disable camelcase */
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { EmailAlreadyExistsError } from './errors/email-already-exists-error'
import { IOrgsRepository } from '@/repositories/IOrgsRepository'
import { randomUUID } from 'crypto'

interface CreateOrgInput {
  id?: string
  name: string
  email: string
  password: string
  cep: string
  address: string
  phone: string
  city: string
}

interface CreateOrgOutput {
  org: Org
}

export class CreateOrgUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private orgRepository: IOrgsRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    cep,
    address,
    phone,
    city,
  }: CreateOrgInput): Promise<CreateOrgOutput> {
    const password_hash = await hash(password, 6)
    const orgWithSameEmail = await this.orgRepository.findByEmail(email)
    if (orgWithSameEmail) throw new EmailAlreadyExistsError()

    const org = await this.orgRepository.create({
      id: id || randomUUID(),
      name,
      email,
      password: password_hash,
      cep,
      address,
      phone,
      city,
    })

    return { org }
  }
}
