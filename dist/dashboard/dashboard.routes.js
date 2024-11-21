"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const farm_repository_1 = require("../farm/infrastructure/farm.repository");
const get_dashboard_usecase_1 = require("./application/usecase/get-dashboard.usecase");
const dashboard_controller_1 = require("./presentation/dashboard.controller");
const DashboardRouter = (0, express_1.Router)();
const farmRepository = new farm_repository_1.FarmRepository();
const getDashboardUseCase = new get_dashboard_usecase_1.GetDashboardUseCase(farmRepository);
const dashboardController = new dashboard_controller_1.DashboardController(getDashboardUseCase);
DashboardRouter.get("/dashboard", (req, res, next) => {
    dashboardController.get(res, next);
});
exports.default = DashboardRouter;
