import { PrismaClient } from "@prisma/client";

export class UserRepository {
  private prisma: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        role: { select: { name: true } },
      },
    });
  }

  async findUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: { select: { name: true } },
      },
    });
  }

  async createUser(data: {
    email: string;
    firstName: string;
    password: string;
  }) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        role: { select: { name: true } },
      },
    });
  }
}
