"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const delete_farm_usecase_1 = require("./delete-farm.usecase");
const farm_service_1 = require("../service/farm.service");
describe("DeleteFarmUseCase", () => {
    let deleteFarmUseCase;
    let farmRepository;
    let farmService;
    beforeEach(() => {
        farmRepository = {
            deleteFarm: jest.fn(),
        };
        farmService = new farm_service_1.FarmService(farmRepository);
        deleteFarmUseCase = new delete_farm_usecase_1.DeleteFarmUseCase(farmRepository);
        const mockFarm = {
            id: "1",
            cpfCnpj: "12345678901",
            producerName: "John Doe",
            farmName: "Farm 1",
            city: "City",
            state: "State",
            totalAreaInHectares: 100,
            cultivableAreaInHectares: 80,
            vegetationAreaInHectares: 20,
            plantedCrops: ["Corn", "Soy"],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest
            .spyOn(farmRepository, "getFarmByCpfCnpj")
            .mockImplementation(async (cpfCnpj) => {
            return mockFarm;
        });
    });
    it("should delete a farm successfully", async () => {
        const cpfCnpj = "123456789";
        const expectedResponse = {
            id: "",
            cpfCnpj: "",
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
        jest.spyOn(farmService, "farmNotFound").mockResolvedValueOnce(undefined);
        jest
            .spyOn(farmRepository, "deleteFarm")
            .mockResolvedValueOnce(expectedResponse);
        const result = await deleteFarmUseCase.execute(cpfCnpj);
        expect(farmService.farmNotFound).toHaveBeenCalledWith(cpfCnpj);
        expect(farmRepository.deleteFarm).toHaveBeenCalledWith(cpfCnpj);
        expect(result).toEqual(expectedResponse);
    });
    it("should throw an error if farm is not found", async () => {
        const cpfCnpj = "123456789";
        const error = new Error("Farm not found");
        jest.spyOn(farmService, "farmNotFound").mockRejectedValueOnce(error);
        await expect(deleteFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
        expect(farmService.farmNotFound).toHaveBeenCalledWith(cpfCnpj);
        expect(farmRepository.deleteFarm).not.toHaveBeenCalled();
    });
    it("should throw an error if deleteFarm fails", async () => {
        const cpfCnpj = "123456789";
        const error = new Error("Delete failed");
        jest.spyOn(farmService, "farmNotFound").mockResolvedValueOnce(undefined);
        jest.spyOn(farmRepository, "deleteFarm").mockRejectedValueOnce(error);
        await expect(deleteFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
        expect(farmService.farmNotFound).toHaveBeenCalledWith(cpfCnpj);
        expect(farmRepository.deleteFarm).toHaveBeenCalledWith(cpfCnpj);
    });
    it("should handle unexpected errors", async () => {
        const cpfCnpj = "123456789";
        const error = new Error("Unexpected error");
        jest.spyOn(farmService, "farmNotFound").mockImplementationOnce(() => {
            throw error;
        });
        await expect(deleteFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
        expect(farmService.farmNotFound).toHaveBeenCalledWith(cpfCnpj);
        expect(farmRepository.deleteFarm).not.toHaveBeenCalled();
    });
});
