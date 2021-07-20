import { Injectable } from '@angular/core';
import { EnvService } from './env.service';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private httpService:HttpService, private envService:EnvService) { }

  API_TOKEN = "apiToken";

  new():Observable<any>{
    console.log('gettoken call');
    return this.httpService.getAsync<string>( `${this.envService.apiBaseUrl}/api/token/create`);
  }

  create(){
    this.new()
    .subscribe(token => {
      this.set(token);
    });    
  }

  get(){
    return sessionStorage.getItem(this.API_TOKEN);
  }

  set(token:string){
    sessionStorage.setItem(this.API_TOKEN, token);
  }

  remove(){
    sessionStorage.removeItem(this.API_TOKEN);
  }

   isValid(token: string):boolean {
     if (!token) return false;
     console.log('expire', jwtHelper.isTokenExpired(token));
     return !jwtHelper.isTokenExpired(token);
  }
  
}
