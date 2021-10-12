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

  get totalItemsByCategoryId() {
    return `${this.apiBaseUrl}/api/product/totalItems`;
  }

  get sessionContext(){
    return `${this.apiBaseUrl}/api/session/getcontext`;
  }

  get productEditItem(){

    return `${this.apiBaseUrl}/api/product/editItem`;
  }


  get updateItem(){

    return `${this.apiBaseUrl}/api/product/`;
  }

  get productDetailByCode(){
    return `${this.apiBaseUrl}/api/productdetail`
  }

  get requestProductItemIdBySizeColor(){
    return  `${this.apiBaseUrl}/api/productdetail/RequestItemId`
  }

  get addItemToCart(){
    return `${this.apiBaseUrl}/api/cart`
  }

  get getCart(){
    return `${this.apiBaseUrl}/api/cart`
  }

  get availableColors(){
    return `${this.apiBaseUrl}/api/productdetail/AvailableColors`
  }

  get availableSizes(){
    return `${this.apiBaseUrl}/api/productdetail/AvailableSizes`
  }

}
