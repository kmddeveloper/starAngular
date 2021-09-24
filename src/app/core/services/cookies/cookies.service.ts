import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils/utils.service';
import { Guid } from "guid-typescript";

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private cookieService:CookieService, private utilsService:UtilsService) { }

  get cartItemKey():string{
    return 'cartItems';
  }

  get totalcardItemsKey():string{
    return 'totalcardItems';
  }

  get clientIdKey():string{
     return 'clientId';
  }

  setCookie(name:string, value:string, expireDays:number=60):void{
    this.cookieService.set(name, value, {expires:expireDays, path:'/'});
  }

  getCookie(name:string):string{
    return this.cookieService.get(name);
  }

  deleteCookie(name:string):void{
    this.cookieService.delete(name);
  }

  checkCookie(name:string):boolean{
    return this.cookieService.check(name);
  }

  getAllCookies(){
    return this.cookieService.getAll();
  }

  deleteAllCookies(){
    this.cookieService.deleteAll();
  }

  initClientId(){
    let clientId = this.cookieService.get(this.clientIdKey);
    if (!clientId ||  clientId===undefined){
      clientId = Guid.create().toString();
      console.log('set cookie client key');
      this.cookieService.set(this.clientIdKey,clientId,60);
    }   
  }

  getClientId():string{
    this.initClientId();
    console.log('get client id=', this.cookieService.get(this.clientIdKey));
    return this.cookieService.get(this.clientIdKey);
  }
}
