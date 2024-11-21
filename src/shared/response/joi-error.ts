import { Request, Response } from "express";
import Joi from "joi";

export const validateSchema = (schema: Joi.ObjectSchema | Joi.StringSchema, data: any) => {
  const { error } = schema.validate(data, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return {
      isValid: false,
      error: errorDetails,
    };
  }
  return { isValid: true };
};
