"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFarmUseCase = void 0;
const farm_entity_1 = require("../../domain/farm.entity");
const farm_service_1 = require("../service/farm.service");
class CreateFarmUseCase {
    constructor(farmRepository) {
        this.farmService = new farm_service_1.FarmService(farmRepository);
        this.farmRepository = farmRepository;
    }
    async execute(data) {
        try {
            await this.farmService.farmExists(data.cpfCnpj);
            await this.farmService.validateTotalArea(data.cultivableAreaInHectares, data.totalAreaInHectares, data.vegetationAreaInHectares);
            return this.farmRepository.createFarm(new farm_entity_1.FarmEntity(data));
        }
        catch (error) {
            throw error;
        }
    }
}
exports.CreateFarmUseCase = CreateFarmUseCase;
