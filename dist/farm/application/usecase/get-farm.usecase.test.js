"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_farm_usecase_1 = require("./get-farm.usecase");
describe("GetFarmUseCase", () => {
    let getFarmUseCase;
    let farmRepository;
    beforeEach(() => {
        farmRepository = {
            getFarmByCpfCnpj: jest.fn(),
        };
        getFarmUseCase = new get_farm_usecase_1.GetFarmUseCase(farmRepository);
    });
    it("should return farm data when cpfCnpj is valid", async () => {
        const cpfCnpj = "12345678901";
        const farmData = {
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
        farmRepository.getFarmByCpfCnpj.mockResolvedValue(farmData);
        const result = await getFarmUseCase.execute(cpfCnpj);
        expect(result).toEqual(farmData);
        expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
    });
    it("should return null when farm is not found", async () => {
        const cpfCnpj = "12345678901";
        farmRepository.getFarmByCpfCnpj.mockResolvedValue(null);
        const result = await getFarmUseCase.execute(cpfCnpj);
        expect(result).toBeNull();
        expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
    });
    it("should throw an error when repository throws an error", async () => {
        const cpfCnpj = "12345678901";
        const error = new Error("Repository error");
        farmRepository.getFarmByCpfCnpj.mockRejectedValue(error);
        await expect(getFarmUseCase.execute(cpfCnpj)).rejects.toThrow(error);
        expect(farmRepository.getFarmByCpfCnpj).toHaveBeenCalledWith(cpfCnpj);
    });
});
