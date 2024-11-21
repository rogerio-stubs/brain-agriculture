import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";
import { FarmService } from "../service/farm.service";

export class DeleteFarmUseCase {
  private farmRepository: FarmRepository;
  private farmService: FarmService;
  constructor(farmRepository: FarmRepository) {
    this.farmService = new FarmService(farmRepository);
    this.farmRepository = farmRepository;
  }

  async execute(cpfCnpj: string): Promise<GetFarmDto> {
    try {
      await this.farmService.farmNotFound(cpfCnpj);
      return this.farmRepository.deleteFarm(cpfCnpj);
    } catch (error) {
        throw error;
    }
  }
}
