import { CreateFarmDto } from "../../farm/application/dto/create-farm.dto";
import { CreateFarmUseCase } from "../../farm/application/usecase/create-farm.usecase";
import { FarmRepository } from "../../farm/infrastructure/farm.repository";
import { farmsSeed } from "../seeds/data/farm";

export class farmsSeeder {
  public static async insertFarms() {
    const farmRepository = new FarmRepository();
    const createFarmUseCase = new CreateFarmUseCase(farmRepository);
    
    const farms: CreateFarmDto[] = farmsSeed;

    farms.forEach(async (farm) => {
      await createFarmUseCase.execute(farm);
    });
  }
}
