"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFarmUseCase = void 0;
class ListFarmUseCase {
    constructor(farmRepository) {
        this.farmRepository = farmRepository;
    }
    async execute() {
        try {
            return this.farmRepository.listFarms();
        }
        catch (error) {
            throw error;
        }
    }
}
exports.ListFarmUseCase = ListFarmUseCase;
