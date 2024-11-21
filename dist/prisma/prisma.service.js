"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaService = void 0;
// src/prisma/prisma.service.ts
const client_1 = require("@prisma/client");
class PrismaService {
    constructor() {
        this.prismaClient = new client_1.PrismaClient();
    }
    get client() {
        return this.prismaClient;
    }
    async shutdown() {
        await this.prismaClient.$disconnect();
    }
}
exports.prismaService = new PrismaService();
