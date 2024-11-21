"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFarmSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const plantedCropd_1 = require("../../../shared/utils/plantedCropd");
const state_1 = require("../../../shared/utils/state");
exports.updateFarmSchema = joi_1.default.object({
    producerName: joi_1.default.string(),
    farmName: joi_1.default.string(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().length(2).valid(...state_1.STATES).uppercase().messages({
        "string.length": "O estado deve ser a sigla de 2 letras",
    }),
    totalAreaInHectares: joi_1.default.number().positive(),
    cultivableAreaInHectares: joi_1.default.number().positive(),
    vegetationAreaInHectares: joi_1.default.number().positive().required(),
    plantedCrops: joi_1.default.array()
        .items(joi_1.default.string().valid(...plantedCropd_1.PLANTED_CROPS))
        .messages({
        "any.only": "Cultura inválida",
    }),
});
