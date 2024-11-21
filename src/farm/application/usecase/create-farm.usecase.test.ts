import { CreateFarmUseCase } from "./create-farm.usecase";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { FarmService } from "../service/farm.service";
import { CreateFarmDto } from "../dto/create-farm.dto";
import { FarmEntity } from "../../domain/farm.entity";
import { FarmType } from "../../domain/farm.type";

describe("CreateFarmUseCase", () => {
  let createFarmUseCase: CreateFarmUseCase;
  let farmRepository: FarmRepository;
  let farmService: FarmService;
  let input: FarmType;

  beforeEach(() => {
    input = {
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

    farmRepository = {
      createFarm: jest.fn(),
      getFarmByCpfCnpj: jest.fn(),
    } as unknown as FarmRepository;
    farmService = new FarmService(farmRepository);
    createFarmUseCase = new CreateFarmUseCase(farmRepository);
  });

  it("should create a farm successfully", async () => {
    jest.spyOn(farmRepository, "getFarmByCpfCnpj").mockResolvedValue(null);
    jest.spyOn(farmService, "farmExists").mockResolvedValue(undefined);
    jest.spyOn(farmService, "validateTotalArea").mockResolvedValue(undefined);
    const createFarmSpy = jest
      .spyOn(farmRepository, "createFarm")
      .mockResolvedValue(input);

    const result = await createFarmUseCase.execute(input);

    expect(createFarmSpy).toHaveBeenCalledWith(input);
    expect(result).toEqual(input);
  });

  it("should throw an error if farm exists", async () => {
    jest.spyOn(farmRepository, "getFarmByCpfCnpj").mockResolvedValue(input);
    jest
      .spyOn(farmService, "farmExists")
      .mockRejectedValue(
        new Error("Um produtor com este CPF/CNPJ já está registrado.")
      );

    await expect(createFarmUseCase.execute(input)).rejects.toThrow(
      "Um produtor com este CPF/CNPJ já está registrado."
    );
  });

  it("should throw an error if total area validation fails", async () => {
    input.totalAreaInHectares = 15;

    jest.spyOn(farmService, "farmExists").mockResolvedValue(undefined);
    jest
      .spyOn(farmService, "validateTotalArea")
      .mockRejectedValue(
        new Error(
          "A soma da área agricultável e da área de vegetação não pode exceder a área total."
        )
      );

    await expect(createFarmUseCase.execute(input)).rejects.toThrow(
      "A soma da área agricultável e da área de vegetação não pode exceder a área total."
    );
  });
});
