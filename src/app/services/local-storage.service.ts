import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

setToken(key:string, value:any) {
    localStorage.setItem(key, value);
 }

 getToken(key:string):any {
    return localStorage.getItem(key);
 }


 removeToken(key:string) {
    localStorage.removeItem(key);
 }


}