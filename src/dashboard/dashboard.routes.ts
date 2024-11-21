import { Router } from "express";
import { FarmRepository } from "../farm/infrastructure/farm.repository";
import { GetDashboardUseCase } from "./application/usecase/get-dashboard.usecase";
import { DashboardController } from "./presentation/dashboard.controller";

const DashboardRouter = Router();

const farmRepository = new FarmRepository();
const getDashboardUseCase = new GetDashboardUseCase(farmRepository);
const dashboardController = new DashboardController(getDashboardUseCase);

DashboardRouter.get("/dashboard", (req, res, next) => {
  dashboardController.get(res, next);
});

export default DashboardRouter;