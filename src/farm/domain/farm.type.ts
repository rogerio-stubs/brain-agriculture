export type FarmType = {
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
}
