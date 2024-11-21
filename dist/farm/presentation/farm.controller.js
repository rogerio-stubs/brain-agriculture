"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmController = void 0;
const create_farm_schema_1 = require("./schema/create-farm.schema");
const joi_error_1 = require("../../shared/response/joi-error");
const update_farm_schema_1 = require("./schema/update-farm.schema");
const cpf_cnpj_schema_1 = require("./schema/cpf-cnpj.schema");
class FarmController {
    constructor(createFarmUseCase, deleteFarmUseCase, updateFarmUseCase, getFarmUseCase, listFarmUseCase) {
        this.createFarmUseCase = createFarmUseCase;
        this.deleteFarmUseCase = deleteFarmUseCase;
        this.updateFarmUseCase = updateFarmUseCase;
        this.getFarmUseCase = getFarmUseCase;
        this.listFarmUseCase = listFarmUseCase;
    }
    async create(req, res, next) {
        try {
            const farm = req.body;
            const validaInput = (0, joi_error_1.validateSchema)(create_farm_schema_1.createFarmSchema, farm);
            if (!validaInput.isValid) {
                return res.status(400).send({ error: validaInput.error });
            }
            const output = await this.createFarmUseCase.execute(farm);
            return res.status(201).json(output);
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const farm = req.body;
            const { cpfCnpj } = req.params;
            const validaParams = (0, joi_error_1.validateSchema)(cpf_cnpj_schema_1.cpfCnpjSchema, cpfCnpj);
            const validaInput = (0, joi_error_1.validateSchema)(update_farm_schema_1.updateFarmSchema, farm);
            if (!validaInput.isValid) {
                return res
                    .status(400)
                    .send({ error: validaInput.error });
            }
            if (!validaParams.isValid) {
                return res.status(400).send({ error: validaParams.error });
            }
            const output = await this.updateFarmUseCase.execute(cpfCnpj, farm);
            return res.status(200).json(output);
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const { cpfCnpj } = req.params;
            const validaParams = (0, joi_error_1.validateSchema)(cpf_cnpj_schema_1.cpfCnpjSchema, cpfCnpj);
            if (!validaParams.isValid) {
                return res.status(400).send({ error: validaParams.error });
            }
            console.log(validaParams);
            await this.deleteFarmUseCase.execute(cpfCnpj);
            return res.status(200).send();
        }
        catch (error) {
            next(error);
        }
    }
    async get(req, res, next) {
        try {
            const { cpfCnpj } = req.params;
            const validaParams = (0, joi_error_1.validateSchema)(cpf_cnpj_schema_1.cpfCnpjSchema, cpfCnpj);
            if (!validaParams.isValid) {
                return res.status(400).send({ error: validaParams.error });
            }
            const output = await this.getFarmUseCase.execute(cpfCnpj);
            return res.status(200).send(output);
        }
        catch (error) {
            next(error);
        }
    }
    async list(res, next) {
        try {
            const ouput = await this.listFarmUseCase.execute();
            return res.status(200).send(ouput);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.FarmController = FarmController;
