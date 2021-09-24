import { Injectable } from '@angular/core';
import {SessionStorageService} from 'src/app/core/services/sessionStorage/session-storage.service';
//ng g service core/services/token

import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private httpService:HttpService, private endpointService:EndpointService, 
              private sessionStorageService:SessionStorageService, private cookieService:CookieService) { }

 

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
    return this.sessionStorageService.getToken();
  }

  setToken(token:string){
    this.sessionStorageService.setToken(token);
  }

  removeToken(){
    this.sessionStorageService.removeToken();
  }

   isValid(token: string):boolean {
     if (!token) return false;
     console.log('expire', jwtHelper.isTokenExpired(token));
     return !jwtHelper.isTokenExpired(token);
  }
  
  
  getRefreshToken(){
    return this.sessionStorageService.getRefreshToken();
  }

  setRefreshToken(token:string){
    this.sessionStorageService.setRefreshToken(token);
  }

  removeRefreshToken(){
    this.sessionStorageService.removeRefreshToken();
  }

}
