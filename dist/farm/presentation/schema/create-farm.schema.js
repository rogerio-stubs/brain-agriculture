"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFarmSchema = void 0;
// src/validations/farmer.validation.ts
const joi_1 = __importDefault(require("joi"));
const cpf_cnpj_validate_1 = require("../../../shared/utils/cpf-cnpj-validate");
const plantedCropd_1 = require("../../../shared/utils/plantedCropd");
const state_1 = require("../../../shared/utils/state");
exports.createFarmSchema = joi_1.default.object({
    cpfCnpj: joi_1.default.string()
        .required()
        .custom(cpf_cnpj_validate_1.validateCpfCnpjJoi, "CPF/CNPJ Validation")
        .messages({
        "any.required": "Parâmetro CPF/CNPJ é obrigatório",
        "string.custom": "CPF ou CNPJ inválido. Certifique-se de que contém 11 ou 14 dígitos.",
    }),
    producerName: joi_1.default.string().required().messages({
        "any.required": "Nome do produtor é obrigatório",
    }),
    farmName: joi_1.default.string().required().messages({
        "any.required": "Nome da fazenda é obrigatório",
    }),
    city: joi_1.default.string().required().messages({
        "any.required": "Cidade é obrigatória",
    }),
    state: joi_1.default.string().length(2).valid(...state_1.STATES).uppercase().required().messages({
        "string.length": "O estado deve ser a sigla de 2 letras",
        "any.required": "Estado é obrigatório",
    }),
    totalAreaInHectares: joi_1.default.number().positive().required().messages({
        "any.required": "Área total é obrigatória",
    }),
    cultivableAreaInHectares: joi_1.default.number().positive().required().messages({
        "any.required": "Área agricultável é obrigatória",
    }),
    vegetationAreaInHectares: joi_1.default.number()
        .positive()
        .required()
        .messages({ "any.required": "Área de vegetação é obrigatória" }),
    plantedCrops: joi_1.default.array()
        .items(joi_1.default.string().valid(...plantedCropd_1.PLANTED_CROPS))
        .required()
        .messages({
        "any.only": "Cultura inválida",
        "any.required": "Culturas plantadas são obrigatórias",
    }),
});
