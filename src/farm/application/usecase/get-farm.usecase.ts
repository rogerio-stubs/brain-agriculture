import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";

export class GetFarmUseCase {
  private farmRepository: FarmRepository;
  constructor(farmRepository: FarmRepository) {
    this.farmRepository = farmRepository;
  }

  async execute(cpfCnpj: string): Promise<GetFarmDto | null> {
    try {
      return this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
    } catch (error) {
        throw error;
    }
  }
}
