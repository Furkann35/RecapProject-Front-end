import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44341/api/auth/';
  userName: string;
  currentUserId: number;
  roles: string[] = [];
  constructor(private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService) { }


  login(loginModel: LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "login", loginModel)
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "register", registerModel)
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut() {
    this.localStorageService.removeToken("token");
    this.toastrService.success('Çıkış yapıldı', 'Başarılı');
  }


  getUserName(): string {
    return this.userName;
  }


}