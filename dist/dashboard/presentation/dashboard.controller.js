"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
class DashboardController {
    constructor(getDashboardUseCase) {
        this.getDashboardUseCase = getDashboardUseCase;
    }
    async get(res, next) {
        try {
            return res.json(await this.getDashboardUseCase.execute());
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DashboardController = DashboardController;
