import { MakeOptional } from "../../../shared/utils/utility";
import { FarmType } from "../../domain/farm.type";

export type UpdateFarmDto = MakeOptional<FarmType, 'id' | 'createdAt' | 'updatedAt' | 'cpfCnpj'>;