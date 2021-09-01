import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  API_TOKEN = "apiToken";
  API_REFRESH_TOKEN = "apiRefreshToken";

  constructor() { }

  getToken(){
    return sessionStorage.getItem(this.API_TOKEN);
  }

  setToken(token:string){
    sessionStorage.setItem(this.API_TOKEN, token);
  }

  removeToken(){
    sessionStorage.removeItem(this.API_TOKEN);
  }

  getRefreshToken(){
    return sessionStorage.getItem(this.API_REFRESH_TOKEN);
  }

  setRefreshToken(token:string){
    sessionStorage.setItem(this.API_REFRESH_TOKEN, token);
  }

  removeRefreshToken(){
    sessionStorage.removeItem(this.API_REFRESH_TOKEN);
  }
}
