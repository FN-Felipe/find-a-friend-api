import { Prisma, Org } from '@prisma/client'
import { IOrgsRepository } from '../IOrgsRepository'
import { randomUUID } from 'crypto'

export class OrgsRepositoryInMemory implements IOrgsRepository {
  public orgs: Org[] = []

  async create(data: Prisma.OrgCreateManyInput) {
    const org = {
      id: `${randomUUID()}`,
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password: data.password,
      city: data.city,
      role: data.role ? data.role : 'MEMBER',
      created_at: new Date(),
    }

    this.orgs.push(org)

    return org
  }

  async findById(id: string) {
    const orgs = this.orgs.find((item) => item.id === id)
    if (!orgs) return null

    return orgs
  }

  async findByEmail(email: string) {
    const orgs = this.orgs.find((item) => item.email === email)
    if (!orgs) return null

    return orgs
  }
}
