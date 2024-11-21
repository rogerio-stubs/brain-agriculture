import { prismaService } from "../../prisma/prisma.service";
import { FarmType } from "../domain/farm.type";
import { IFarmRepository } from "../domain/ifarm.repository";

export class FarmRepository implements IFarmRepository {
  async createFarm(data: FarmType): Promise<FarmType> {
    const farm = prismaService.client.farm.create({ data });
    return farm;
  }

  async getFarmById(id: string): Promise<FarmType | null> {
    return prismaService.client.farm.findUnique({ where: { id } });
  }

  async getFarmByCpfCnpj(cpfCnpj: string): Promise<FarmType | null> {
   return prismaService.client.farm.findUnique({ where: { cpfCnpj } });
  }

  async listFarms(): Promise<FarmType[]> {
    return prismaService.client.farm.findMany();
  }

  async updateFarm(cpfCnpj: string, farm: FarmType): Promise<FarmType> {
    return prismaService.client.farm.update({ where: { cpfCnpj }, data: farm });
  }

  async deleteFarm(cpfCnpj: string): Promise<FarmType> {
    return prismaService.client.farm.delete({ where: { cpfCnpj } });
  }
}
