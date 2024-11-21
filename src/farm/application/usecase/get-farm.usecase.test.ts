import { GetFarmUseCase } from "./get-farm.usecase";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";

describe("GetFarmUseCase", () => {
  let getFarmUseCase: GetFarmUseCase;
  let farmRepository: FarmRepository;

  beforeEach(() => {
    farmRepository = {
      getFarmByCpfCnpj: jest.fn(),
    } as unknown as FarmRepository;
    getFarmUseCase = new GetFarmUseCase(farmRepository);
  });

  it("should return farm data when cpfCnpj is valid", async () => {
    const cpfCnpj = "12345678901";
    const farmData: GetFarmDto = {
        id: "1",
        farmName: "Farm 1",
        cpfCnpj: "12345678901",
        producerName: "",
        city: "",
        state: "",
        totalAreaInHectares: 0,
        cultivableAreaInHectares: 0,
        vegetationAreaInHectares: 0,
        plantedCrops: [],
        createdAt: new Date(),
        updatedAt: new Date()
    };
    (farmRepository.getFarmByCpfCnpj as jest.Mock).mockResolvedValue(farmData);

    const result = await getFarmUseCase.execute(cpfCnpj);

    expect(result).toEqual(farmData);
    expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
  });

  it("should return null when farm is not found", async () => {
    const cpfCnpj = "12345678901";
    (farmRepository.getFarmByCpfCnpj as jest.Mock).mockResolvedValue(null);

    const result = await getFarmUseCase.execute(cpfCnpj);

    expect(result).toBeNull();
    expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
  });

  it("should throw an error when repository throws an error", async () => {
    const cpfCnpj = "12345678901";
    const error = new Error("Repository error");
    (farmRepository.getFarmByCpfCnpj as jest.Mock).mockRejectedValue(error);

    await expect(getFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
    expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
  });
});
