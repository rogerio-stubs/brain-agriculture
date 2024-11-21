import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";

export class ListFarmUseCase {
  private farmRepository: FarmRepository;
  constructor(farmRepository: FarmRepository) {
    this.farmRepository = farmRepository;
  }

  async execute(): Promise<GetFarmDto[] | null> {
    try {
      return this.farmRepository.listFarms();
    } catch (error) {
        throw error;
    }
  }
}
