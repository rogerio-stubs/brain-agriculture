import { FarmType } from "../../domain/farm.type";

export type CreateFarmDto = Omit<FarmType, 'id' | 'createdAt' | 'updatedAt'>;
