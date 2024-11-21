// src/prisma/prisma.service.ts
import { PrismaClient } from "@prisma/client";

class PrismaService {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  get client() {
    return this.prismaClient;
  }

  async shutdown() {
    await this.prismaClient.$disconnect();
  }
}

export const prismaService = new PrismaService();
