import { UpdateFarmUseCase } from "./update-farm.usecase";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { FarmService } from "../service/farm.service";
import { UpdateFarmDto } from "../dto/update-farm.dto";
import { FarmEntity } from "../../domain/farm.entity";
import { FarmType } from "../../domain/farm.type";

describe("UpdateFarmUseCase", () => {
  let updateFarmUseCase: UpdateFarmUseCase;
  let farmRepository: FarmRepository;
  let farmService: FarmService;

  beforeEach(() => {
    farmRepository = {
      updateFarm: jest.fn(),
      getFarmByCpfCnpj: jest.fn(),
    } as unknown as FarmRepository;
    farmService = new FarmService(farmRepository);
    updateFarmUseCase = new UpdateFarmUseCase(farmRepository);
  });

  it("should update farm successfully", async () => {
    const cpfCnpj = "123456789";
    const updateFarmDto: FarmType = {
      id: "",
      cpfCnpj: "12345678901",
      producerName: "",
      farmName: "",
      city: "",
      state: "",
      cultivableAreaInHectares: 100,
      totalAreaInHectares: 150,
      vegetationAreaInHectares: 50,
      plantedCrops: [],
      createdAt: new Date("2024-11-21T21:30:54.911Z"),
      updatedAt: new Date("2024-11-21T21:30:54.911Z"),
    };

    jest.spyOn(farmService, "farmNotFound").mockResolvedValue(undefined);
    jest
      .spyOn(farmRepository, "getFarmByCpfCnpj")
      .mockResolvedValue(updateFarmDto);
    jest.spyOn(farmService, "validateTotalArea").mockResolvedValue();
    jest.spyOn(farmRepository, "updateFarm").mockResolvedValue(updateFarmDto);

    const result = await updateFarmUseCase.execute(cpfCnpj, updateFarmDto);

    expect(result).toEqual(updateFarmDto);
  });

  it("should throw an error if farm not found", async () => {
    const cpfCnpj = "123456789";
    const updateFarmDto: FarmType = {
      id: "",
      cpfCnpj: "12345678901",
      producerName: "",
      farmName: "",
      city: "",
      state: "",
      cultivableAreaInHectares: 100,
      totalAreaInHectares: 150,
      vegetationAreaInHectares: 50,
      plantedCrops: [],
      createdAt: new Date("2024-11-21T21:30:54.911Z"),
      updatedAt: new Date("2024-11-21T21:30:54.911Z"),
    };

    jest
      .spyOn(farmService, "farmNotFound")
      .mockRejectedValue(new Error("Produtor não encontrado."));

    await expect(
      updateFarmUseCase.execute(cpfCnpj, updateFarmDto)
    ).rejects.toThrow("Produtor não encontrado.");
  });

  it("should throw an error if validation fails", async () => {
    const cpfCnpj = "12345678901";
    const updateFarmDto: FarmType = {
      id: "",
      cpfCnpj: "12345678901",
      producerName: "",
      farmName: "",
      city: "",
      state: "",
      cultivableAreaInHectares: 100,
      totalAreaInHectares: 10,
      vegetationAreaInHectares: 50,
      plantedCrops: [],
      createdAt: new Date("2024-11-21T21:30:54.911Z"),
      updatedAt: new Date("2024-11-21T21:30:54.911Z"),
    };

    jest.spyOn(farmService, "farmNotFound").mockResolvedValue();
    jest
      .spyOn(farmRepository, "getFarmByCpfCnpj")
      .mockResolvedValue(updateFarmDto);
    jest
      .spyOn(farmService, "validateTotalArea")
      .mockRejectedValue(
        new Error(
          "A soma da área agricultável e da área de vegetação não pode exceder a área total."
        )
      );

    await expect(
      updateFarmUseCase.execute(cpfCnpj, updateFarmDto)
    ).rejects.toThrow(
      "A soma da área agricultável e da área de vegetação não pode exceder a área total."
    );
  });
});
