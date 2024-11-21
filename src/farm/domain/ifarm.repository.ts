import { FarmType } from "./farm.type";

export interface IFarmRepository {
    createFarm(farm: FarmType): Promise<FarmType>;
    getFarmById(id: string): Promise<FarmType | null>;
    getFarmByCpfCnpj(cpfCnpj: string): Promise<FarmType | null>;
    listFarms(): Promise<FarmType[]>;
    updateFarm(cpfCnpj: string, farm: FarmType): Promise<FarmType>;
    deleteFarm(cpfCnpj: string): Promise<FarmType>;
}