import { Request, Response, NextFunction } from "express";
import { CreateFarmUseCase } from "../application/usecase/create-farm.usecase";
import { createFarmSchema } from "./schema/create-farm.schema";
import { validateSchema } from "../../shared/response/joi-error";
import { updateFarmSchema } from "./schema/update-farm.schema";
import { DeleteFarmUseCase } from "../application/usecase/delete-farm.usecase";
import { UpdateFarmUseCase } from "../application/usecase/update-farm.usecase";
import { GetFarmUseCase } from "../application/usecase/get-farm.usecase";
import { ListFarmUseCase } from "../application/usecase/list-farm.usecase";
import { cpfCnpjSchema } from "./schema/cpf-cnpj.schema";
export class FarmController {
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly deleteFarmUseCase: DeleteFarmUseCase,
    private readonly updateFarmUseCase: UpdateFarmUseCase,
    private readonly getFarmUseCase: GetFarmUseCase,
    private readonly listFarmUseCase: ListFarmUseCase
  ) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const farm = req.body;
      const validaInput = validateSchema(createFarmSchema, farm);

      if (!validaInput.isValid) {
        return res.status(400).send({ error: validaInput.error });
      }

      const output = await this.createFarmUseCase.execute(farm);
      return res.status(201).json(output);
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const farm = req.body;
      const { cpfCnpj } = req.params;
      const validaParams = validateSchema(cpfCnpjSchema, cpfCnpj);
      const validaInput = validateSchema(updateFarmSchema, farm);

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
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { cpfCnpj } = req.params;
      const validaParams = validateSchema(cpfCnpjSchema, cpfCnpj);

      if (!validaParams.isValid) {
        return res.status(400).send({ error: validaParams.error });
      }
      console.log(validaParams);
      await this.deleteFarmUseCase.execute(cpfCnpj);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { cpfCnpj } = req.params;
      const validaParams = validateSchema(cpfCnpjSchema, cpfCnpj);

      if (!validaParams.isValid) {
        return res.status(400).send({ error: validaParams.error });
      }
      const output = await this.getFarmUseCase.execute(cpfCnpj);
      return res.status(200).send(output);
    } catch (error) {
      next(error);
    }
  }

  async list(res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const ouput = await this.listFarmUseCase.execute();
      return res.status(200).send(ouput);
    } catch (error) {
      next(error);
    }
  }
}
