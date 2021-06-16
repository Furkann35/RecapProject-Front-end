import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  apiUrl = "https://localhost:44341/api/creditCards/";
  constructor(private httpClient: HttpClient) { }

  checkCreditCard(creditCard: CreditCard):Observable<ResponseModel>{
    let url = this.apiUrl + "checkcreditcard"
    return this.httpClient.post<ResponseModel>(url, creditCard)
  }
}
