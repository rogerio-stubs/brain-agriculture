import { FarmEntity } from "../../domain/farm.entity";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";
import { UpdateFarmDto } from "../dto/update-farm.dto";
import { FarmService } from "../service/farm.service";

export class UpdateFarmUseCase {
  private farmRepository: FarmRepository;
  private farmService: FarmService;
  constructor(farmRepository: FarmRepository) {
    this.farmService = new FarmService(farmRepository);
    this.farmRepository = farmRepository;
  }

  async execute(cpfCnpj: string, data: UpdateFarmDto): Promise<GetFarmDto> {
    try {
      await this.farmService.farmNotFound(cpfCnpj);
      const farm = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
      console.log('aqui')
      const newCultivableAreaInHectares =
        data.cultivableAreaInHectares ?? farm!.cultivableAreaInHectares;
      const newTotalAreaInHectares =
        data.totalAreaInHectares ?? farm!.totalAreaInHectares;
      const newVegetationAreaInHectares =
        data.vegetationAreaInHectares ?? farm!.vegetationAreaInHectares;

      await this.farmService.validateTotalArea(
        newCultivableAreaInHectares,
        newTotalAreaInHectares,
        newVegetationAreaInHectares
      );

      return this.farmRepository.updateFarm(
        cpfCnpj,
        new FarmEntity({ cpfCnpj, ...data })
      );
    } catch (error) {
      throw error;
    }
  }
}
