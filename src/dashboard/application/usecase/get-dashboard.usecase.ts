import { FarmRepository } from "../../../farm/infrastructure/farm.repository";
import { IDashboardMetrics } from "../interface/idashborad";
import { DashboardService } from "../service/dashboard.service";

export class GetDashboardUseCase {
  private dashboardService: DashboardService;
  constructor(private farmRepository: FarmRepository) {
    this.dashboardService = new DashboardService();
  }

  async execute(): Promise<IDashboardMetrics> {
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
