import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) {}
    apiUrl = "https://localhost:44341/api/"

   getColors():Observable<ListResponseModel<Color>>{
     let newPath = this.apiUrl + "colors/getall" 
     return this.httpClient.get<ListResponseModel<Color>>(newPath)
   }

   getColorsByCar(colorId:number):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl + "colors/getbyid?colorId=" + colorId 
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }
}
