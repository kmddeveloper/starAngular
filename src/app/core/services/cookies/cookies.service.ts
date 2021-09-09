import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UtilsService } from '../utils/utils.service';

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

  setCookie(name:string, value:string):void{
    this.cookieService.set(name, value, {expires:60, path:'/'});
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
}
