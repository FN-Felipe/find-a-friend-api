import { Prisma } from '@prisma/client'
import { IOrgsRepository } from '../IOrgsRepository'
import { prisma } from '@/lib/prisma'

export class OrgsRepositoryDatabase implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: {
        id,
      },
    })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email,
      },
    })
    return org
  }
}
