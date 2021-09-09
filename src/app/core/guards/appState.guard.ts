import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/core/services/state/state.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import { ShoppingCartService } from '../services/shoppingCart/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class AppStateGuard implements OnInit, CanActivate {

  constructor(private stateService:StateService, private shoppingCartService:ShoppingCartService, private tokenService:TokenService)
  {

  }

  ngOnInit():void{  
   
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      console.log('HELLO I AM HERE');
      this.stateService.updateState().subscribe(next =>{        
        this.shoppingCartService.getCartState();
      });
    
    return true;
  }
  
}
