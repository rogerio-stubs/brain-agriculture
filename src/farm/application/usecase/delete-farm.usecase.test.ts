import { DeleteFarmUseCase } from "./delete-farm.usecase";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { FarmService } from "../service/farm.service";
import { FarmType } from "../../domain/farm.type";

describe("DeleteFarmUseCase", () => {
  let deleteFarmUseCase: DeleteFarmUseCase;
  let farmRepository: FarmRepository;
  let farmService: FarmService;

  beforeEach(() => {
    farmRepository = {
      deleteFarm: jest.fn(),
      getFarmByCpfCnpj: jest.fn(),
    } as unknown as FarmRepository;
    farmService = new FarmService(farmRepository);
    deleteFarmUseCase = new DeleteFarmUseCase(farmRepository);
  });

  it("should delete a farm successfully", async () => {
    const cpfCnpj = "12345678909";
    const farmDto: FarmType = {
      id: "",
      cpfCnpj: "12345678909",
      producerName: "",
      farmName: "",
      city: "",
      state: "",
      totalAreaInHectares: 0,
      cultivableAreaInHectares: 0,
      vegetationAreaInHectares: 0,
      plantedCrops: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(farmRepository, "getFarmByCpfCnpj").mockResolvedValue(farmDto);
    jest.spyOn(farmService, "farmNotFound").mockResolvedValue(undefined);
    jest.spyOn(farmRepository, "deleteFarm").mockResolvedValue(farmDto);

    const result = await deleteFarmUseCase.execute(cpfCnpj);

    expect(farmRepository.deleteFarm).toHaveBeenCalledWith(cpfCnpj);
    expect(result).toEqual(farmDto);
  });

  it("should throw an error if farm is not found", async () => {
    const cpfCnpj = "123456789";
    const error = new Error("Produtor não encontrado.");
    jest.spyOn(farmService, "farmNotFound").mockRejectedValue(error);

    await expect(deleteFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
    expect(farmRepository.deleteFarm).not.toHaveBeenCalled();
  });
});
