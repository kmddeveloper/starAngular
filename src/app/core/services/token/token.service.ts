import { Injectable } from '@angular/core';
//ng g service core/services/token

import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private httpService:HttpService, private endpointService:EndpointService) { }

  API_TOKEN = "apiToken";
  API_REFRESH_TOKEN = "apiRefreshToken";

  new(sessionId:string):Observable<any>{
    console.log('gettoken call sessionid=',sessionId);
    return this.httpService.postAsync<string>(`${this.endpointService.createToken}`,JSON.stringify(sessionId));
  }

   create(sessionId:string){
    console.log('create sessionIdid=', sessionId);
      let newSub = this.new(sessionId).subscribe({
      next: token => {
        console.log('token', token);
        this.setToken(token.access_Token);
      },
      error: error => {
        console.log('Create token error=', error)
      },
      complete: ()=> {
        newSub.unsubscribe();
      }
  })  
  }

  getToken(){
    return sessionStorage.getItem(this.API_TOKEN);
  }

  setToken(token:string){
    sessionStorage.setItem(this.API_TOKEN, token);
  }

  removeToken(){
    sessionStorage.removeItem(this.API_TOKEN);
  }

   isValid(token: string):boolean {
     if (!token) return false;
     console.log('expire', jwtHelper.isTokenExpired(token));
     return !jwtHelper.isTokenExpired(token);
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
