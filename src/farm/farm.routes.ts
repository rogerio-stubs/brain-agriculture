import { Router } from "express";
import { FarmController } from "./presentation/farm.controller";
import { FarmRepository } from "./infrastructure/farm.repository";
import { CreateFarmUseCase } from "./application/usecase/create-farm.usecase";
import { DeleteFarmUseCase } from "./application/usecase/delete-farm.usecase";
import { UpdateFarmUseCase } from "./application/usecase/update-farm.usecase";
import { GetFarmUseCase } from "./application/usecase/get-farm.usecase";
import { ListFarmUseCase } from "./application/usecase/list-farm.usecase";

const FarmRouter = Router();

const farmRepository = new FarmRepository();
const createFarmUseCase = new CreateFarmUseCase(farmRepository);
const deleteFarmUseCase = new DeleteFarmUseCase(farmRepository);
const updateFarmUseCase = new UpdateFarmUseCase(farmRepository);
const getFarmUseCase = new GetFarmUseCase(farmRepository);
const listFarmUseCase = new ListFarmUseCase(farmRepository);
const farmController = new FarmController(
  createFarmUseCase,
  deleteFarmUseCase,
  updateFarmUseCase,
  getFarmUseCase,
  listFarmUseCase
);

// Definir rotas do módulo
//TODO: verificar uma maneira de não ficar repetindo /farm
FarmRouter.post("/farm", (req, res, next) => {
  farmController.create(req, res, next);
});
FarmRouter.put("/farm/:cpfCnpj", (req, res, next) => {
  farmController.update(req, res, next);
});
FarmRouter.delete("/farm/:cpfCnpj", (req, res, next) => {
  farmController.delete(req, res, next);
});
FarmRouter.get("/farm/:cpfCnpj", (req, res, next) => {
  farmController.get(req, res, next);
});
FarmRouter.get("/farm", (req, res, next) => {
  farmController.list(res, next);
});

export default FarmRouter;
