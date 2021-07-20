//ng g interceptor core/interceptors/httpFilter

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HttpFilterInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(

      //if url contains 'format', otherwise do nothing
      filter(event => event instanceof HttpResponse && request.url.includes('format')),
      map((event: HttpResponse<any>) => event.clone({ body: event.body.data.users.list }))

    )
  };
}


//assuming response is:
/*
{
  "id": "123",
    "metadata": "blah",
    "data": {
      "users": {
      "count": 4,
      "list": [
        "bob",
        "john",
        "doe"
      ]
    }
  }

*/