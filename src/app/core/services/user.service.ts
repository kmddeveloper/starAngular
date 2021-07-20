
//ng g service core/services/user
import { ConstantPool } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {User} from '../models/User';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {EnvService} from './env.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private httpService: HttpService, private envService:EnvService) { }

  getUser() {
    console.log('baseurl', this.envService.apiBaseUrl);
    return this.httpService.getAsync<User>( `${this.envService.apiBaseUrl}/api/user/5`);
  }  
}
