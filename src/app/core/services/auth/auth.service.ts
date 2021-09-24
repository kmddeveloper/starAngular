// ng g service core/services/auth
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from  'src/app/core/models/Session';
import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';

import { HttpService } from 'src/app/core/services/http/http.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { TokenService } from 'src/app/core/services/token/token.service';
import {AuthResult} from 'src/app/core/models/AuthResult';
import { Token } from '@angular/compiler/src/ml_parser/lexer';


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

  auth(email:string, password:string): Observable<any>{  // 1
 
    return new Observable<any>(  // 2
        observer => {   // 3
          let loginSub = this.login(email,password).subscribe({

            next: session => {
                if (session && session.userId > 0){            
      
                   let newTokenSub = this.tokenService.new(session.id).subscribe({
                      next: token => {
                        console.log('creating token-session=', session);
                        console.log('creating token-sessionid=', session.id);
                        console.log('creating token', token);
                        this.stateService.setState(session);   
                        this.tokenService.setToken(token.access_Token);
                        console.log('created token-session=', session);   
                        let authResult = this.buildAuthResult(token.access_Token, session.id, token.clientGuidId);
                        observer.next(authResult);
                      },
                      error: error => {
                          console.log("tokenService.new error", error);
                          newTokenSub.unsubscribe();
                          observer.next(error);
                      },
                      complete: () => {
                        newTokenSub.unsubscribe();
                      }
                      
                  });            
                }
            },
            error: error => {
              console.log('error message this.login', error);
              observer.next(error);
              
            },
            complete: ()=> {
              loginSub.unsubscribe();
            }
      
           }
          );
        }//observer =>
    );
  }

  private buildAuthResult(accessToken:string, sessionid:string, clientid:string):AuthResult{
   return {
     clientid:clientid, 
     token: accessToken, 
     sessionid:sessionid, 
     status:'sucess'
    };
  }
}