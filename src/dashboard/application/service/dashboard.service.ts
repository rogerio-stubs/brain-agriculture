import { STATES } from "../../../shared/utils/state";
import { ICropDistribution } from "../interface/icrop-distribution";
import { IFarm } from "../interface/ifarm";
import { ILandUseDistribution } from "../interface/iland-use-distriution";
import { IStateDistribution } from "../interface/istate-distribution";

export class DashboardService {
  getFarmCount(farms: IFarm[]): number {
    return farms.length;
  }

  getFarmAreaInHectares(farms: IFarm[]): number {
    const totalArea = farms.reduce((acc, farm) => {
      return acc + farm.totalAreaInHectares;
    }, 0);
    return totalArea;
  }

  getStateDistribution(farms: IFarm[]): IStateDistribution {
    const states = STATES;

    const farmsByState = states.reduce((acc, state) => {
      acc[state] = 0;
      return acc;
    }, {} as Record<string, number>);

    farms.forEach((farm) => {
      farmsByState[farm.state] = (farmsByState[farm.state] || 0) + 1;
    });

    const totalFarms = farms.length;
    const farmsByStatePercentage = states.reduce((acc, state) => {
      acc[state] = totalFarms ? (farmsByState[state] / totalFarms) * 100 : 0;
      return acc;
    }, {} as Record<string, number>);

    return { absolute: farmsByState, percentage: farmsByStatePercentage };
  }

  getCropDistribution(farms: IFarm[]): ICropDistribution {
    const cropCounts: Record<string, number> = {};

    farms.forEach((farm) => {
      farm.plantedCrops.forEach((crop) => {
        cropCounts[crop] = (cropCounts[crop] || 0) + 1;
      });
    });

    const totalCrops = Object.values(cropCounts).reduce(
      (acc, count) => acc + count,
      0
    );

    for (const crop in cropCounts) {
      cropCounts[crop] = (cropCounts[crop] / totalCrops) * 100;
    }

    return cropCounts;
  }

  getLandUseDistribution(farms: IFarm[]): ILandUseDistribution {
    const totalCultivableArea = farms.reduce(
      (acc, farm) => acc + farm.cultivableAreaInHectares,
      0
    );
    const totalVegetationArea = farms.reduce(
      (acc, farm) => acc + farm.vegetationAreaInHectares,
      0
    );
    const totalArea = totalCultivableArea + totalVegetationArea;

    return {
      cultivableAreaPercentage: (totalCultivableArea / totalArea) * 100,
      vegetationAreaPercentage: (totalVegetationArea / totalArea) * 100,
    };
  }
}
