import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient,
  ) { }
  apiUrl = "https://localhost:44341/api/rentals/"
  getRentals(): Observable<ListResponseModel<Rental>> {
    let url = this.apiUrl + "getrentaldetails"
    return this.httpClient.get<ListResponseModel<Rental>>(url)
  }

  add(rental: Rental) {
    let url = this.apiUrl + "add"
    return this.httpClient.post<ResponseModel>(url, rental)
  }

  checkIsCarRentable(rental: Rental): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "carrentedcheck", rental)
  }

}
