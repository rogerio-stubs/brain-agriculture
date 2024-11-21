// src/validations/farmer.validation.ts
import Joi from "joi";
import { validateCpfCnpjJoi } from "../../../shared/utils/cpf-cnpj-validate";
import { PLANTED_CROPS } from "../../../shared/utils/plantedCropd";
import { STATES } from "../../../shared/utils/state";

export const createFarmSchema = Joi.object({
  cpfCnpj: Joi.string()
    .required()
    .custom(validateCpfCnpjJoi, "CPF/CNPJ Validation")
    .messages({
      "any.required": "Parâmetro CPF/CNPJ é obrigatório",
      "string.custom":
        "CPF ou CNPJ inválido. Certifique-se de que contém 11 ou 14 dígitos.",
    }),
  producerName: Joi.string().required().messages({
    "any.required": "Nome do produtor é obrigatório",
  }),
  farmName: Joi.string().required().messages({
    "any.required": "Nome da fazenda é obrigatório",
  }),
  city: Joi.string().required().messages({
    "any.required": "Cidade é obrigatória",
  }),
  state: Joi.string().length(2).valid(...STATES).uppercase().required().messages({
    "string.length": "O estado deve ser a sigla de 2 letras",
    "any.required": "Estado é obrigatório",
  }),
  totalAreaInHectares: Joi.number().positive().required().messages({
    "any.required": "Área total é obrigatória",
  }),
  cultivableAreaInHectares: Joi.number().positive().required().messages({
    "any.required": "Área agricultável é obrigatória",
  }),
  vegetationAreaInHectares: Joi.number()
    .positive()
    .required()
    .messages({ "any.required": "Área de vegetação é obrigatória" }),
  plantedCrops: Joi.array()
    .items(
      Joi.string().valid(...PLANTED_CROPS)
    )
    .required()
    .messages({
      "any.only": "Cultura inválida",
      "any.required": "Culturas plantadas são obrigatórias",
    }),
});
