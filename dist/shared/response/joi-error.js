"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const validateSchema = (schema, data) => {
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
exports.validateSchema = validateSchema;
