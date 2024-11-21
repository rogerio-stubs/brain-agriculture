import { FarmEntity } from "../../domain/farm.entity";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { CreateFarmDto } from "../dto/create-farm.dto";
import { GetFarmDto } from "../dto/get-farm.dto";
import { FarmService } from "../service/farm.service";

export class CreateFarmUseCase {
  private farmRepository: FarmRepository;
  private farmService: FarmService;
  constructor(farmRepository: FarmRepository) {
    this.farmService = new FarmService(farmRepository);
    this.farmRepository = farmRepository;
  }

  async execute(data: CreateFarmDto): Promise<GetFarmDto> {
    try {
      await this.farmService.farmExists(data.cpfCnpj);
      await this.farmService.validateTotalArea(
        data.cultivableAreaInHectares,
        data.totalAreaInHectares,
        data.vegetationAreaInHectares
      );
      return this.farmRepository.createFarm(new FarmEntity(data));
    } catch (error) {
        throw error;
    }
  }
}
