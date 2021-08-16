
//ng g service core/services/user
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {HttpService} from 'src/app/core/services/http/http.service';
import {User} from 'src/app/core/models/User';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpService: HttpService, private endpointService:EndpointService) { }

  getUser(userId:Number) {
    console.log('baseurl', this.endpointService.apiBaseUrl);
    return this.httpService.getAsync<User>(`${this.endpointService.userById}/${userId}`);
  }  
}
