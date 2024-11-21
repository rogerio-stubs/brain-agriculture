import { GetDashboardUseCase } from "./get-dashboard.usecase";
import { FarmRepository } from "../../../farm/infrastructure/farm.repository";
import { DashboardService } from "../service/dashboard.service";
import { IDashboardMetrics } from "../interface/idashborad";
import { IFarm } from "../interface/ifarm";
import { ILandUseDistribution } from "../interface/iland-use-distriution";

jest.mock("../../../farm/infrastructure/farm.repository");
jest.mock("../service/dashboard.service");

describe("GetDashboardUseCase", () => {
  let getDashboardUseCase: GetDashboardUseCase;
  let farmRepository: jest.Mocked<FarmRepository>;
  let dashboardService: jest.Mocked<DashboardService>;

  beforeEach(() => {
    farmRepository = new FarmRepository() as jest.Mocked<FarmRepository>;
    dashboardService = new DashboardService() as jest.Mocked<DashboardService>;
    getDashboardUseCase = new GetDashboardUseCase(farmRepository);
    getDashboardUseCase["dashboardService"] = dashboardService;
  });

  it("should return dashboard metrics", async () => {
    const farms: IFarm[] = [
      {
        id: "1",
        farmName: "Farm 1",
        state: "PR",
        totalAreaInHectares: 100,
        cultivableAreaInHectares: 60,
        vegetationAreaInHectares: 40,
        plantedCrops: ["Milho", "Trigo"],
        cpfCnpj: "",
        producerName: "",
        city: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        farmName: "Farm 2",
        state: "SP",
        totalAreaInHectares: 200,
        cultivableAreaInHectares: 150,
        vegetationAreaInHectares: 50,
        plantedCrops: ["Milho", "Soja"],
        cpfCnpj: "",
        producerName: "",
        city: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    farmRepository.listFarms.mockResolvedValue(farms);
    dashboardService.getFarmCount.mockReturnValue(2);
    dashboardService.getFarmAreaInHectares.mockReturnValue(100);
    dashboardService.getStateDistribution.mockReturnValue({
      absolute: {
        PR: 1,
        SP: 1,
        RS: 0,
        SC: 0,
        MG: 0,
        RJ: 0,
        ES: 0,
        BA: 0,
        PE: 0,
        CE: 0,
        GO: 0,
        MT: 0,
        MS: 0,
        TO: 0,
        MA: 0,
        PI: 0,
        PA: 0,
        AM: 0,
        AC: 0,
        RO: 0,
        RR: 0,
        AP: 0,
        SE: 0,
        AL: 0,
        PB: 0,
        RN: 0,
        DF: 0,
      },
      percentage: {
        PR: 50,
        SP: 50,
        RS: 0,
        SC: 0,
        MG: 0,
        RJ: 0,
        ES: 0,
        BA: 0,
        PE: 0,
        CE: 0,
        GO: 0,
        MT: 0,
        MS: 0,
        TO: 0,
        MA: 0,
        PI: 0,
        PA: 0,
        AM: 0,
        AC: 0,
        RO: 0,
        RR: 0,
        AP: 0,
        SE: 0,
        AL: 0,
        PB: 0,
        RN: 0,
        DF: 0,
      },
    });
    dashboardService.getCropDistribution.mockReturnValue({
      Milho: 50,
      Soja: 50,
    });
    dashboardService.getLandUseDistribution.mockReturnValue({
      cultivableAreaPercentage: 70,
      vegetationAreaPercentage: 30,
    });

    const result: IDashboardMetrics = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalFarms: 2,
      totalArea: 100,
      farmsByState: {
        absolute: {
          PR: 1,
          SP: 1,
          RS: 0,
          SC: 0,
          MG: 0,
          RJ: 0,
          ES: 0,
          BA: 0,
          PE: 0,
          CE: 0,
          GO: 0,
          MT: 0,
          MS: 0,
          TO: 0,
          MA: 0,
          PI: 0,
          PA: 0,
          AM: 0,
          AC: 0,
          RO: 0,
          RR: 0,
          AP: 0,
          SE: 0,
          AL: 0,
          PB: 0,
          RN: 0,
          DF: 0,
        },
        percentage: {
          PR: 50,
          SP: 50,
          RS: 0,
          SC: 0,
          MG: 0,
          RJ: 0,
          ES: 0,
          BA: 0,
          PE: 0,
          CE: 0,
          GO: 0,
          MT: 0,
          MS: 0,
          TO: 0,
          MA: 0,
          PI: 0,
          PA: 0,
          AM: 0,
          AC: 0,
          RO: 0,
          RR: 0,
          AP: 0,
          SE: 0,
          AL: 0,
          PB: 0,
          RN: 0,
          DF: 0,
        },
      },
      cropsDistribution: { Milho: 50, Soja: 50 },
      landUseDistribution: {
        cultivableAreaPercentage: 70,
        vegetationAreaPercentage: 30,
      },
    });
  });

  it("should handle empty farms list", async () => {
    farmRepository.listFarms.mockResolvedValue([]);
    dashboardService.getFarmCount.mockReturnValue(0);
    dashboardService.getFarmAreaInHectares.mockReturnValue(0);
    dashboardService.getStateDistribution.mockReturnValue({
      absolute: {
        PR: 0,
        SP: 0,
        RS: 0,
        SC: 0,
        MG: 0,
        RJ: 0,
        ES: 0,
        BA: 0,
        PE: 0,
        CE: 0,
        GO: 0,
        MT: 0,
        MS: 0,
        TO: 0,
        MA: 0,
        PI: 0,
        PA: 0,
        AM: 0,
        AC: 0,
        RO: 0,
        RR: 0,
        AP: 0,
        SE: 0,
        AL: 0,
        PB: 0,
        RN: 0,
        DF: 0,
      },
      percentage: {
        PR: 0,
        SP: 0,
        RS: 0,
        SC: 0,
        MG: 0,
        RJ: 0,
        ES: 0,
        BA: 0,
        PE: 0,
        CE: 0,
        GO: 0,
        MT: 0,
        MS: 0,
        TO: 0,
        MA: 0,
        PI: 0,
        PA: 0,
        AM: 0,
        AC: 0,
        RO: 0,
        RR: 0,
        AP: 0,
        SE: 0,
        AL: 0,
        PB: 0,
        RN: 0,
        DF: 0,
      },
    });
    dashboardService.getCropDistribution.mockReturnValue({});
    dashboardService.getLandUseDistribution.mockReturnValue({
      cultivableAreaPercentage: 0,
      vegetationAreaPercentage: 0,
    });

    const result: IDashboardMetrics = await getDashboardUseCase.execute();

    expect(result).toEqual({
      totalFarms: 0,
      totalArea: 0,
      farmsByState: {
        absolute: {
          PR: 0,
          SP: 0,
          RS: 0,
          SC: 0,
          MG: 0,
          RJ: 0,
          ES: 0,
          BA: 0,
          PE: 0,
          CE: 0,
          GO: 0,
          MT: 0,
          MS: 0,
          TO: 0,
          MA: 0,
          PI: 0,
          PA: 0,
          AM: 0,
          AC: 0,
          RO: 0,
          RR: 0,
          AP: 0,
          SE: 0,
          AL: 0,
          PB: 0,
          RN: 0,
          DF: 0,
        },
        percentage: {
          PR: 0,
          SP: 0,
          RS: 0,
          SC: 0,
          MG: 0,
          RJ: 0,
          ES: 0,
          BA: 0,
          PE: 0,
          CE: 0,
          GO: 0,
          MT: 0,
          MS: 0,
          TO: 0,
          MA: 0,
          PI: 0,
          PA: 0,
          AM: 0,
          AC: 0,
          RO: 0,
          RR: 0,
          AP: 0,
          SE: 0,
          AL: 0,
          PB: 0,
          RN: 0,
          DF: 0,
        },
      },
      cropsDistribution: {},
      landUseDistribution: {
        cultivableAreaPercentage: 0,
        vegetationAreaPercentage: 0,
      },
    });
  });
});