"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_farm_usecase_1 = require("./create-farm.usecase");
const farm_repository_1 = require("../../infrastructure/farm.repository");
const farm_service_1 = require("../service/farm.service");
const error_1 = require("../../../shared/response/error");
jest.mock('../../infrastructure/farm.repository');
jest.mock('../service/farm.service');
describe('CreateFarmUseCase', () => {
    let createFarmUseCase;
    let farmRepository;
    let farmService;
    beforeEach(() => {
        farmRepository = new farm_repository_1.FarmRepository();
        farmService = new farm_service_1.FarmService(farmRepository);
        createFarmUseCase = new create_farm_usecase_1.CreateFarmUseCase(farmRepository);
    });
    it('should create a farm successfully', async () => {
        const createFarmDto = {
            cpfCnpj: '12345678901',
            cultivableAreaInHectares: 100,
            totalAreaInHectares: 150,
            vegetationAreaInHectares: 50,
            producerName: 'Producer Name',
            farmName: 'Farm Name',
            city: 'City',
            state: 'State',
            plantedCrops: [],
        };
        const getFarmDto = {
            ...createFarmDto,
            id: 'mocked-id',
            createdAt: new Date('2024-11-18T02:04:56.700Z'),
            updatedAt: new Date('2024-11-18T02:04:56.700Z'),
        };
        farmService.farmExists.mockResolvedValueOnce(undefined);
        farmService.validateTotalArea.mockResolvedValueOnce(undefined);
        farmRepository.createFarm.mockResolvedValueOnce(getFarmDto);
        const result = await createFarmUseCase.execute(createFarmDto);
        expect(result).toEqual(getFarmDto);
        expect(farmService.farmExists).toHaveBeenCalledWith(createFarmDto.cpfCnpj);
        expect(farmService.validateTotalArea).toHaveBeenCalledWith(createFarmDto.cultivableAreaInHectares, createFarmDto.totalAreaInHectares, createFarmDto.vegetationAreaInHectares);
        // Verificação lógica em vez de instância
        expect(farmRepository.createFarm).toHaveBeenCalledWith(expect.objectContaining({
            ...createFarmDto,
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        }));
    });
    it('should throw an error if farm already exists', async () => {
        const createFarmDto = {
            cpfCnpj: '12345678901',
            cultivableAreaInHectares: 100,
            totalAreaInHectares: 150,
            vegetationAreaInHectares: 50,
            producerName: 'Producer Name',
            farmName: 'Farm Name',
            city: 'City',
            state: 'State',
            plantedCrops: [],
        };
        farmService.farmExists.mockRejectedValueOnce(new error_1.AppError('Farm already exists'));
        await expect(createFarmUseCase.execute(createFarmDto)).rejects.toThrow('Farm already exists');
        expect(farmService.farmExists).toHaveBeenCalledWith(createFarmDto.cpfCnpj);
        expect(farmService.validateTotalArea).not.toHaveBeenCalled();
        expect(farmRepository.createFarm).not.toHaveBeenCalled();
    });
    it('should throw an error if total area validation fails', async () => {
        const createFarmDto = {
            cpfCnpj: '12345678901',
            cultivableAreaInHectares: 100,
            totalAreaInHectares: 150,
            vegetationAreaInHectares: 50,
            producerName: 'Producer Name',
            farmName: 'Farm Name',
            city: 'City',
            state: 'State',
            plantedCrops: [],
        };
        farmService.farmExists.mockResolvedValueOnce(undefined);
        farmService.validateTotalArea.mockRejectedValueOnce(new error_1.AppError('Invalid total area'));
        await expect(createFarmUseCase.execute(createFarmDto)).rejects.toThrow('Invalid total area');
        expect(farmService.farmExists).toHaveBeenCalledWith(createFarmDto.cpfCnpj);
        expect(farmService.validateTotalArea).toHaveBeenCalledWith(createFarmDto.cultivableAreaInHectares, createFarmDto.totalAreaInHectares, createFarmDto.vegetationAreaInHectares);
        expect(farmRepository.createFarm).not.toHaveBeenCalled();
    });
});
