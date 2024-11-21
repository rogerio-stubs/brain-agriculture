"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFarmUseCase = void 0;
const farm_entity_1 = require("../../domain/farm.entity");
const farm_service_1 = require("../service/farm.service");
class UpdateFarmUseCase {
    constructor(farmRepository) {
        this.farmService = new farm_service_1.FarmService(farmRepository);
        this.farmRepository = farmRepository;
    }
    async execute(cpfCnpj, data) {
        try {
            await this.farmService.farmNotFound(cpfCnpj);
            const farm = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
            console.log('aqui');
            const newCultivableAreaInHectares = data.cultivableAreaInHectares ?? farm.cultivableAreaInHectares;
            const newTotalAreaInHectares = data.totalAreaInHectares ?? farm.totalAreaInHectares;
            const newVegetationAreaInHectares = data.vegetationAreaInHectares ?? farm.vegetationAreaInHectares;
            await this.farmService.validateTotalArea(newCultivableAreaInHectares, newTotalAreaInHectares, newVegetationAreaInHectares);
            return this.farmRepository.updateFarm(cpfCnpj, new farm_entity_1.FarmEntity({ cpfCnpj, ...data }));
        }
        catch (error) {
            throw error;
        }
    }
}
exports.UpdateFarmUseCase = UpdateFarmUseCase;
