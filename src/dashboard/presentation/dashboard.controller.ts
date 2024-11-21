import { Request, Response, NextFunction } from "express";
import { GetDashboardUseCase } from "../application/usecase/get-dashboard.usecase";

export class DashboardController {
  constructor(
    private readonly getDashboardUseCase: GetDashboardUseCase
  ) {}

  async get(
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      return res.json(await this.getDashboardUseCase.execute());
    } catch (error) {
      next(error);
    }
  }
}