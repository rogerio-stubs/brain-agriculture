import { DashboardService } from "./dashboard.service";
import { IFarm } from "../interface/ifarm";

describe("DashboardService", () => {
  let dashboardService: DashboardService;

  beforeEach(() => {
    dashboardService = new DashboardService();
  });

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

  it("should return the correct farm count", () => {
    const count = dashboardService.getFarmCount(farms);
    expect(count).toBe(2);
  });

  it("should return the correct total farm area in hectares", () => {
    const totalArea = dashboardService.getFarmAreaInHectares(farms);
    expect(totalArea).toBe(300);
  });

  it("should return the correct state distribution", () => {
    const stateDistribution = dashboardService.getStateDistribution(farms);
    expect(stateDistribution.absolute).toEqual({
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
    });
    expect(stateDistribution.percentage).toEqual({
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
    });
  });

  it("should return the correct crop distribution", () => {
    const cropDistribution = dashboardService.getCropDistribution(farms);
    expect(cropDistribution).toEqual({ Milho: 50, Trigo: 25, Soja: 25 });
  });

  it("should return the correct land use distribution", () => {
    const landUseDistribution = dashboardService.getLandUseDistribution(farms);
    expect(landUseDistribution.cultivableAreaPercentage).toBeCloseTo(70);
    expect(landUseDistribution.vegetationAreaPercentage).toBeCloseTo(30);
  });
});
