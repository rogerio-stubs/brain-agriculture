"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFarmUseCase = void 0;
class GetFarmUseCase {
    constructor(farmRepository) {
        this.farmRepository = farmRepository;
    }
    async execute(cpfCnpj) {
        try {
            return this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
        }
        catch (error) {
            throw error;
        }
    }
}
exports.GetFarmUseCase = GetFarmUseCase;
