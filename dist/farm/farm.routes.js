"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const farm_controller_1 = require("./presentation/farm.controller");
const farm_repository_1 = require("./infrastructure/farm.repository");
const create_farm_usecase_1 = require("./application/usecase/create-farm.usecase");
const delete_farm_usecase_1 = require("./application/usecase/delete-farm.usecase");
const update_farm_usecase_1 = require("./application/usecase/update-farm.usecase");
const get_farm_usecase_1 = require("./application/usecase/get-farm.usecase");
const list_farm_usecase_1 = require("./application/usecase/list-farm.usecase");
const FarmRouter = (0, express_1.Router)();
const farmRepository = new farm_repository_1.FarmRepository();
const createFarmUseCase = new create_farm_usecase_1.CreateFarmUseCase(farmRepository);
const deleteFarmUseCase = new delete_farm_usecase_1.DeleteFarmUseCase(farmRepository);
const updateFarmUseCase = new update_farm_usecase_1.UpdateFarmUseCase(farmRepository);
const getFarmUseCase = new get_farm_usecase_1.GetFarmUseCase(farmRepository);
const listFarmUseCase = new list_farm_usecase_1.ListFarmUseCase(farmRepository);
const farmController = new farm_controller_1.FarmController(createFarmUseCase, deleteFarmUseCase, updateFarmUseCase, getFarmUseCase, listFarmUseCase);
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
exports.default = FarmRouter;
