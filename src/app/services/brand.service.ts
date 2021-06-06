import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:44341/api/"

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  getBrandsByCar(brandId:number):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl + "brands/getbyid?brandId=" + brandId 
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }
}
