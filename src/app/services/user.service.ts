import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
  ) { }
  apiUrl = "https://localhost:44341/api/users/"

  getUsers(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + "getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath)
  }

  update(user: User): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "update", user)
  }
  
  getUserDetailByUserId(userId: number): Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyid?id=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

}
