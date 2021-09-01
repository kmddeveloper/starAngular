//ng g interceptor core/interceptors/httpToken 

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse 
} from '@angular/common/http';


import { throwError,Observable,BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap, finalize, flatMap } from "rxjs/operators";
import { NgIfContext } from '@angular/common';
import { ConditionalExpr } from '@angular/compiler';
import { TokenService } from 'src/app/core/services/token/token.service';
import { Router } from '@angular/router';



@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private TOKEN = "secrettoken";
  HEADER_TOKEN = "api-token";
  private REFRESH_TOKEN = "secretRefreshToken";
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public http: HttpClient, private tokenService:TokenService, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = this.addAuthenticationToken(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          console.log('error addAuthentication Token=', error);
         // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(request)))
            );
          }
          else {
            this.refreshTokenInProgress = true;
  
            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);
            
            this.router.navigateByUrl('/login');
            

            //Call this when refreshToken is implemented.
            return this.refreshAccessToken(request,next).pipe(
              switchMap((success: boolean) => {               
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(request));
              }),
               // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(()=> this.refreshTokenInProgress=false)              
            );            
          }
        }       
      else {
        return throwError(error);
      }
    })
  );
}
  private refreshAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    //Add logic here to refresh the token: get a new token, save it into session storage, thn add it to authenticationtoken.
    let params = {
      token: this.tokenService.getToken(),
      refreshToken:   this.getApiRefreshToken()
    };



    return this.http.post('localhost:8080/auth/refresh', params)
      .pipe(
          flatMap((data: any) => {
            //If reload successful update tokens
            if (data.status == 200) {
              //Update tokens
              this.tokenService.setToken(data.result.token);
              this.tokenService.setToken(data.result.refreshToken);
              //Clone our fieled request ant try to resend it
              request = request.clone({
                setHeaders: {
                  'api-token' : data.result.token
                }
              });
              return next.handle(request);
            }else {
              //Logout from account
            }
          })
      );
 }



  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    const token: string = this.tokenService.getToken();

    if (token) {
        request = request.clone({ headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + token) });
    }    

    if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
    }

    return request.clone({ headers: request.headers.set('Accept', 'application/json') });

  }

  private getApiRefreshToken(){
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }

}
