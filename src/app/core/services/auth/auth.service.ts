// ng g service core/services/auth
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from  'src/app/core/models/Session';
import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';

import { HttpService } from 'src/app/core/services/http/http.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { TokenService } from 'src/app/core/services/token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpService:HttpService, private endpointService:EndpointService,
              private tokenService:TokenService, private stateService:StateService
              ) 
              { }


  login(email:string, password:string):Observable<Session>{

    return this.httpService.postAsync<Session>(`${this.endpointService.login}`, {email: email, password:password});
    
  }

}