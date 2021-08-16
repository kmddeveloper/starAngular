//ng g service core/services/endpoint

import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/core/services/env/env.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  constructor(private envService:EnvService) { }

  //apiBaseUrl:string = 'http://localhost:60667'; //this.envService.apiBaseUrl;
  apiBaseUrl:string =  this.envService.apiBaseUrl;

  get login(){
    return `${this.apiBaseUrl}/api/auth`;
  }

  get createToken(){
    return `${this.apiBaseUrl}/api/token/create`;
  }

  get userById(){
    return `${this.apiBaseUrl}/api/user`;
  }

  get browseProduct() {
    return `${this.apiBaseUrl}/api/product/browse`;
  }

  get sessionContext(){
    return `${this.apiBaseUrl}/api/session/getcontext`;
  }

}
