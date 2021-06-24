import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';

import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44341/api/cars/";

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + "getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId: number) {
    let newPath = this.apiUrl + "getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getColorsByColorId(colorId: number) {
    let newPath = this.apiUrl + "getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailByCarId(carId: number) {
    let newPath = this.apiUrl + "getcardetailbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailDtoByCarId(carId: number) {
    let newPath = this.apiUrl + "getcardetailbyid?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDtos() {
    let newPath = this.apiUrl + "getcardetails"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add ", car)
  }

  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update", car)
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + 'getbyid?id='+carId;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

}