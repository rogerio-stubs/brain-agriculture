"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFarmUseCase = void 0;
const farm_service_1 = require("../service/farm.service");
class DeleteFarmUseCase {
    constructor(farmRepository) {
        this.farmService = new farm_service_1.FarmService(farmRepository);
        this.farmRepository = farmRepository;
    }
    async execute(cpfCnpj) {
        try {
            await this.farmService.farmNotFound(cpfCnpj);
            return this.farmRepository.deleteFarm(cpfCnpj);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.DeleteFarmUseCase = DeleteFarmUseCase;
