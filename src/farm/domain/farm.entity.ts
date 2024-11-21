import { randomUUID } from "crypto";
import { FarmType } from "./farm.type";
import { MakeOptional } from "../../shared/utils/utility";

type Data = MakeOptional<FarmType, 'id' | 'createdAt' | 'updatedAt'>;

export class FarmEntity implements FarmType {
    id: string;
    cpfCnpj: string;
    producerName: string;
    farmName: string;
    city: string;
    state: string;
    totalAreaInHectares: number;
    cultivableAreaInHectares: number;
    vegetationAreaInHectares: number;   
    plantedCrops: string[];    
    createdAt: Date;
    updatedAt: Date;

    constructor(data: Data) {
        this.id = data.id ?? randomUUID();
        this.cpfCnpj = data.cpfCnpj
        this.producerName = data.producerName ?? '';
        this.farmName = data.farmName ?? '';
        this.city = data.city ?? '';
        this.state = data.state ?? '';
        this.totalAreaInHectares = data.totalAreaInHectares ?? 0;
        this.cultivableAreaInHectares = data.cultivableAreaInHectares ?? 0;
        this.vegetationAreaInHectares = data.vegetationAreaInHectares ?? 0;
        this.plantedCrops = data.plantedCrops ?? [];
        this.createdAt = data.createdAt ?? new Date();
        this.updatedAt = data.updatedAt ?? new Date();
    }
}