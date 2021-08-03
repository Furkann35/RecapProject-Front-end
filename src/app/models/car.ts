import { Rental } from "./rental";

export interface Car {
    carId: number;
    carName: string;
    brandName: number;
    colorName: number;
    modelYear : number;
    dailyPrice: number;
    description: string;
    images: string[];
    rentals: Rental[]
}