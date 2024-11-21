"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmService = void 0;
const error_1 = require("../../../shared/response/error");
class FarmService {
    constructor(farmRepository) {
        this.farmRepository = farmRepository;
    }
    async farmExists(cpfCnpj) {
        const existingFarmer = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
        if (existingFarmer) {
            throw new error_1.AppError("Um produtor com este CPF/CNPJ já está registrado.", 409);
        }
    }
    async farmNotFound(cpfCnpj) {
        const existingFarmer = await this.farmRepository.getFarmByCpfCnpj(cpfCnpj);
        if (!existingFarmer) {
            throw new error_1.AppError("Produtor não encontrado.", 404);
        }
    }
    async validateTotalArea(cultivableAreaInHectares, totalAreaInHectares, vegetationAreaInHectares) {
        if (cultivableAreaInHectares + vegetationAreaInHectares > totalAreaInHectares) {
            throw new error_1.AppError("A soma da área agricultável e da área de vegetação não pode exceder a área total.", 400);
        }
    }
}
exports.FarmService = FarmService;
