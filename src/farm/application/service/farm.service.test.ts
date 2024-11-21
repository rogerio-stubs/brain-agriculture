import { FarmService } from "./farm.service";
import { FarmRepository } from "../../infrastructure/farm.repository";
import { AppError } from "../../../shared/response/error";

jest.mock("../../infrastructure/farm.repository");

describe("FarmService", () => {
    let farmService: FarmService;
    let farmRepository: jest.Mocked<FarmRepository>;

    beforeEach(() => {
        farmRepository = new FarmRepository() as jest.Mocked<FarmRepository>;
        farmService = new FarmService(farmRepository);
    });

    describe("farmExists", () => {
        it("should throw an error if the farm already exists", async () => {
            farmRepository.getFarmByCpfCnpj.mockResolvedValueOnce({
                id: "1",
                farmName: "Mock Farm",
                state: "SP",
                totalAreaInHectares: 100,
                cultivableAreaInHectares: 60,
                vegetationAreaInHectares: 40,
                plantedCrops: ["Milho", "Soja"],
                cpfCnpj: "12345678900",
                producerName: "Mock Producer",
                city: "Mock City",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await expect(farmService.farmExists("12345678900")).rejects.toThrow(
                new AppError("Um produtor com este CPF/CNPJ já está registrado.", 409)
            );
        });

        it("should not throw an error if the farm does not exist", async () => {
            farmRepository.getFarmByCpfCnpj.mockResolvedValueOnce(null);

            await expect(farmService.farmExists("12345678900")).resolves.not.toThrow();
        });
    });

    describe("farmNotFound", () => {
        it("should throw an error if the farm is not found", async () => {
            farmRepository.getFarmByCpfCnpj.mockResolvedValueOnce(null);

            await expect(farmService.farmNotFound("12345678900")).rejects.toThrow(
                new AppError("Produtor não encontrado.", 404)
            );
        });

        it("should not throw an error if the farm is found", async () => {
            farmRepository.getFarmByCpfCnpj.mockResolvedValueOnce({
                id: "1",
                farmName: "Mock Farm",
                state: "SP",
                totalAreaInHectares: 100,
                cultivableAreaInHectares: 60,
                vegetationAreaInHectares: 40,
                plantedCrops: ["Milho", "Soja"],
                cpfCnpj: "12345678900",
                producerName: "Mock Producer",
                city: "Mock City",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await expect(farmService.farmNotFound("12345678900")).resolves.not.toThrow();
        });
    });

    describe("validateTotalArea", () => {
        it("should throw an error if the sum of cultivable and vegetation areas exceeds the total area", async () => {
            await expect(
                farmService.validateTotalArea(60, 100, 50)
            ).rejects.toThrow(
                new AppError(
                    "A soma da área agricultável e da área de vegetação não pode exceder a área total.",
                    400
                )
            );
        });

        it("should not throw an error if the sum of cultivable and vegetation areas does not exceed the total area", async () => {
            await expect(
                farmService.validateTotalArea(40, 100, 50)
            ).resolves.not.toThrow();
        });
    });
});