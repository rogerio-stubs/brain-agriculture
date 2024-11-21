import { AppError } from "../../../shared/response/error";
import { FarmRepository } from "../../infrastructure/farm.repository";

export class FarmService {
  constructor(private farmRepository: FarmRepository) {}

  async farmExists(cpfCnpj: string): Promise<void> {
    const existingFarmer = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
    if (existingFarmer) {
      throw new AppError(
        "Um produtor com este CPF/CNPJ já está registrado.",
        409
      );
    }
  }

  async farmNotFound(cpfCnpj: string): Promise<void> {
    const existingFarmer = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
    if (!existingFarmer) {
      throw new AppError("Produtor não encontrado.", 404);
    }
  }

  async validateTotalArea(
    cultivableAreaInHectares: number,
    totalAreaInHectares: number,
    vegetationAreaInHectares: number
  ): Promise<void> {
    if (cultivableAreaInHectares + vegetationAreaInHectares > totalAreaInHectares) {
      throw new AppError(
        "A soma da área agricultável e da área de vegetação não pode exceder a área total.",
        400
      );
    }
  }
}
