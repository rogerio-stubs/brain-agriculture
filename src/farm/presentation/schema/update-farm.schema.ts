import Joi from "joi";
import { PLANTED_CROPS } from "../../../shared/utils/plantedCropd";
import { STATES } from "../../../shared/utils/state";

export const updateFarmSchema = Joi.object({
  producerName: Joi.string(),
  farmName: Joi.string(),
  city: Joi.string().optional(),
  state: Joi.string().length(2).valid(...STATES).uppercase().messages({
    "string.length": "O estado deve ser a sigla de 2 letras",
  }),
  totalAreaInHectares: Joi.number().positive(),
  cultivableAreaInHectares: Joi.number().positive(),
  vegetationAreaInHectares: Joi.number().positive().required(),
  plantedCrops: Joi.array()
    .items(
      Joi.string().valid(...PLANTED_CROPS)
    )
    .messages({
      "any.only": "Cultura inválida",
    }),
});
