"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const state_1 = require("../../../shared/utils/state");
class DashboardService {
    getFarmCount(farms) {
        return farms.length;
    }
    getFarmAreaInHectares(farms) {
        const totalArea = farms.reduce((acc, farm) => {
            return acc + farm.totalAreaInHectares;
        }, 0);
        return totalArea;
    }
    getStateDistribution(farms) {
        const states = state_1.STATES;
        const farmsByState = states.reduce((acc, state) => {
            acc[state] = 0;
            return acc;
        }, {});
        farms.forEach((farm) => {
            farmsByState[farm.state] = (farmsByState[farm.state] || 0) + 1;
        });
        const totalFarms = farms.length;
        const farmsByStatePercentage = states.reduce((acc, state) => {
            acc[state] = totalFarms ? (farmsByState[state] / totalFarms) * 100 : 0;
            return acc;
        }, {});
        return { absolute: farmsByState, percentage: farmsByStatePercentage };
    }
    getCropDistribution(farms) {
        const cropCounts = {};
        farms.forEach((farm) => {
            farm.plantedCrops.forEach((crop) => {
                cropCounts[crop] = (cropCounts[crop] || 0) + 1;
            });
        });
        const totalCrops = Object.values(cropCounts).reduce((acc, count) => acc + count, 0);
        for (const crop in cropCounts) {
            cropCounts[crop] = (cropCounts[crop] / totalCrops) * 100;
        }
        return cropCounts;
    }
    getLandUseDistribution(farms) {
        const totalCultivableArea = farms.reduce((acc, farm) => acc + farm.cultivableAreaInHectares, 0);
        const totalVegetationArea = farms.reduce((acc, farm) => acc + farm.vegetationAreaInHectares, 0);
        const totalArea = totalCultivableArea + totalVegetationArea;
        return {
            cultivableAreaPercentage: (totalCultivableArea / totalArea) * 100,
            vegetationAreaPercentage: (totalVegetationArea / totalArea) * 100,
        };
    }
}
exports.DashboardService = DashboardService;
