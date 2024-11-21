"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cpfCnpjSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const cpf_cnpj_validate_1 = require("../../../shared/utils/cpf-cnpj-validate");
exports.cpfCnpjSchema = joi_1.default.string()
    .required()
    .custom(cpf_cnpj_validate_1.validateCpfCnpjJoi, "CPF/CNPJ Validation")
    .messages({
    "any.required": "Parâmetro CPF/CNPJ é obrigatório",
    "string.custom": "CPF ou CNPJ inválido. Certifique-se de que contém 11 ou 14 dígitos.",
});
