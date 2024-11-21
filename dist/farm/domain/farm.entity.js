"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmEntity = void 0;
const crypto_1 = require("crypto");
class FarmEntity {
    constructor(data) {
        this.id = data.id ?? (0, crypto_1.randomUUID)();
        this.cpfCnpj = data.cpfCnpj;
        this.producerName = data.producerName ?? '';
        this.farmName = data.farmName ?? '';
        this.city = data.city ?? '';
        this.state = data.state ?? '';
        this.totalAreaInHectares = data.totalAreaInHectares ?? 0;
        this.cultivableAreaInHectares = data.cultivableAreaInHectares ?? 0;
        this.vegetationAreaInHectares = data.vegetationAreaInHectares ?? 0;
        this.plantedCrops = data.plantedCrops ?? [];
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
}
exports.FarmEntity = FarmEntity;
