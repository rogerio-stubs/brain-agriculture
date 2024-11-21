import { ListFarmUseCase } from "./list-farm.usecase";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { GetFarmDto } from "../dto/get-farm.dto";

describe("ListFarmUseCase", () => {
  let listFarmUseCase: ListFarmUseCase;
  let farmRepository: FarmRepository;

  beforeEach(() => {
    farmRepository = {
      listFarms: jest.fn(),
    } as unknown as FarmRepository;
    listFarmUseCase = new ListFarmUseCase(farmRepository);
  });

  it("should return a list of farms", async () => {
    const farms: GetFarmDto[] = [
      {
          id: "1", farmName: "Farm 1",
          cpfCnpj: "",
          producerName: "",
          city: "",
          state: "",
          totalAreaInHectares: 0,
          cultivableAreaInHectares: 0,
          vegetationAreaInHectares: 0,
          plantedCrops: [],
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: "2", farmName: "Farm 2",
          cpfCnpj: "",
          producerName: "",
          city: "",
          state: "",
          totalAreaInHectares: 0,
          cultivableAreaInHectares: 0,
          vegetationAreaInHectares: 0,
          plantedCrops: [],
          createdAt: new Date(),
          updatedAt: new Date()
      },
    ];
    (farmRepository.listFarms as jest.Mock).mockResolvedValue(farms);

    const result = await listFarmUseCase.execute();

    expect(result).toEqual(farms);
    expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
  });

  it("should return null if no farms are found", async () => {
    (farmRepository.listFarms as jest.Mock).mockResolvedValue(null);

    const result = await listFarmUseCase.execute();

    expect(result).toBeNull();
    expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if repository throws an error", async () => {
    const error = new Error("Repository error");
    (farmRepository.listFarms as jest.Mock).mockRejectedValue(error);

    await expect(listFarmUseCase.execute()).rejects.toThrow("Repository error");
    expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
  });
});
