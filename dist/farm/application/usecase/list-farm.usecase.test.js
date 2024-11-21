"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const list_farm_usecase_1 = require("./list-farm.usecase");
describe("ListFarmUseCase", () => {
    let listFarmUseCase;
    let farmRepository;
    beforeEach(() => {
        farmRepository = {
            listFarms: jest.fn(),
        };
        listFarmUseCase = new list_farm_usecase_1.ListFarmUseCase(farmRepository);
    });
    it("should return a list of farms", async () => {
        const farms = [
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
        farmRepository.listFarms.mockResolvedValue(farms);
        const result = await listFarmUseCase.execute();
        expect(result).toEqual(farms);
        expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
    });
    it("should return null if no farms are found", async () => {
        farmRepository.listFarms.mockResolvedValue(null);
        const result = await listFarmUseCase.execute();
        expect(result).toBeNull();
        expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
    });
    it("should throw an error if repository throws an error", async () => {
        const error = new Error("Repository error");
        farmRepository.listFarms.mockRejectedValue(error);
        await expect(listFarmUseCase.execute()).rejects.toThrow("Repository error");
        expect(farmRepository.listFarms).toHaveBeenCalledTimes(1);
    });
});
