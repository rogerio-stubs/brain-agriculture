import { ICropDistribution } from "./icrop-distribution";
import { ILandUseDistribution } from "./iland-use-distriution";
import { IStateDistribution } from "./istate-distribution";

export interface IDashboardMetrics {
  totalFarms: number;
  totalArea: number;
  farmsByState: IStateDistribution;
  cropsDistribution: ICropDistribution;
  landUseDistribution: ILandUseDistribution;
}
