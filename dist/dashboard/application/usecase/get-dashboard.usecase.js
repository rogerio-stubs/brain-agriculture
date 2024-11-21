"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDashboardUseCase = void 0;
const dashboard_service_1 = require("../service/dashboard.service");
class GetDashboardUseCase {
    constructor(farmRepository) {
        this.farmRepository = farmRepository;
        this.dashboardService = new dashboard_service_1.DashboardService();
    }
    async execute() {
        const farms = await this.farmRepository.listFarms();
        return {
            totalFarms: this.dashboardService.getFarmCount(farms),
            totalArea: this.dashboardService.getFarmAreaInHectares(farms),
            farmsByState: this.dashboardService.getStateDistribution(farms),
            cropsDistribution: this.dashboardService.getCropDistribution(farms),
            landUseDistribution: this.dashboardService.getLandUseDistribution(farms),
        };
    }
}
exports.GetDashboardUseCase = GetDashboardUseCase;
