//ng g service core/services/http
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private httpClient: HttpClient) { }

   httpHeaderJson = {
     headers: new HttpHeaders(
       {
       'Content-Type':'application/json',
       }
     )
    }

    getAsync<T>(url:string): Observable<T> {
      console.log('calling getAsync');     
      return this.httpClient.get<T>(url)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )     
    }
  
    postAsync<T>(endPoint:string, postField:any): Observable<T> {
      return this.httpClient.post<T>(endPoint, postField, this.httpHeaderJson)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
    }  
  
    putAsync<T>(endPoint:string, postField:string): Observable<T> {
      return this.httpClient.put<T>(endPoint, postField, this.httpHeaderJson)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
    }
  
    deleteAsync<T>(url:string){
      return this.httpClient.delete<any>(url, this.httpHeaderJson)
      .pipe(
        retry(1),
        catchError(this.httpError)
      )
    }
  
    httpError(error) {
      console.log('inside httpError');
      console.log(error);
      return throwError(error);  

      /*
      let msg = '';
      msg = error;

      if(error.error instanceof ErrorEvent) {
        // client side error
        msg = error.error.message;
      } else {
        // server side error
        msg = error; //`Error Code: ${error.status}\nMessage: ${error.error?error.error:error.message}`;
      }
 
      console.log(msg);
      return throwError(msg);  
      */
    }


}
