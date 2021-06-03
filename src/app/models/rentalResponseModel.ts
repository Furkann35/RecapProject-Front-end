import { Rental } from "./rental";
import { ResponseModel } from "./responseModel";

export interface RentalResponsModel extends ResponseModel{
    data:Rental[]
}