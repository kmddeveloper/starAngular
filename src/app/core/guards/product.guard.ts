import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductGuard implements CanActivate {

   constructor(private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     const pageNum =  Number( next.queryParamMap.get('pagenum'));
       if (isNaN(pageNum) || pageNum <=0)
       {
         alert('Invalid pageNum from Guard'+ pageNum);
         this.router.navigate(['/home']);
         return false;
       }

     return true;
  }
  
}
