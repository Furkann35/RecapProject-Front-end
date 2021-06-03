import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalResponsModel } from '../models/rentalResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = "https://localhost:44341/api/rentals/getrentaldetails"
  getRentals():Observable<RentalResponsModel>{
    return this.httpClient.get<RentalResponsModel>(this.apiUrl)
  }
}
