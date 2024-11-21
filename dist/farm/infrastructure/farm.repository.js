"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmRepository = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
class FarmRepository {
    async createFarm(data) {
        const farm = prisma_service_1.prismaService.client.farm.create({ data });
        return farm;
    }
    async getFarmById(id) {
        return prisma_service_1.prismaService.client.farm.findUnique({ where: { id } });
    }
    async getFarmByCpfCnpj(cpfCnpj) {
        return prisma_service_1.prismaService.client.farm.findUnique({ where: { cpfCnpj } });
    }
    async listFarms() {
        return prisma_service_1.prismaService.client.farm.findMany();
    }
    async updateFarm(cpfCnpj, farm) {
        return prisma_service_1.prismaService.client.farm.update({ where: { cpfCnpj }, data: farm });
    }
    async deleteFarm(cpfCnpj) {
        return prisma_service_1.prismaService.client.farm.delete({ where: { cpfCnpj } });
    }
}
exports.FarmRepository = FarmRepository;
