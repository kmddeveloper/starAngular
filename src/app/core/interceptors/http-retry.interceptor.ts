//ng g interceptor core/interceptors/httpRetry
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class HttpRetryInterceptor implements HttpInterceptor {
  
 
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const retry_times = 2;
    return next.handle(request).pipe(retry(retry_times));
  }
}
