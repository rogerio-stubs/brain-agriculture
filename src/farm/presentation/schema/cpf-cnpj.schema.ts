import Joi from "joi";
import { validateCpfCnpjJoi } from "../../../shared/utils/cpf-cnpj-validate";

export const cpfCnpjSchema = Joi.string()
  .required()
  .custom(validateCpfCnpjJoi, "CPF/CNPJ Validation")
  .messages({
    "any.required": "Parâmetro CPF/CNPJ é obrigatório",
    "string.custom":
      "CPF ou CNPJ inválido. Certifique-se de que contém 11 ou 14 dígitos.",
  });
