import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient) { }
  apiUrl = "https://localhost:44341/api/brands/"

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }

  getBrandsByCar(brandId: number): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + "getbyid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Brand>>(newPath)
  }


  getByBrandId(id: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + "getbyid?id=" + id
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath)
  }
  
  add(brand: Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "add ", brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update", brand)
  }

}
