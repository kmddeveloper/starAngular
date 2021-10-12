import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from 'src/app/core/models/Session';
import {State} from 'src/app/core/models/State';
import { TokenService } from 'src/app/core/services/token/token.service';
import { SessionService } from 'src/app/core/services/session/session.service';
import { RouterStateSnapshot } from '@angular/router';
import { CookiesService } from '../cookies/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state = new BehaviorSubject<State>(this.initState);

  public state$ =  this._state.asObservable();

  constructor(private tokenService:TokenService, private sessionService:SessionService,
              private cookiesService:CookiesService) {}

  set state(currentState:State){
     this._state.next(currentState);
  }
  
  get initState():State{
    return {
      session_id: '',
      user_id: 0,
      email:'',
      user_name:'',
      first_name: 'guest',
      last_name:'',
      role:'guest'
    }    
  }

  updateState():Observable<any>{
    return new Observable<any>(  // 2
      observer => {  
        console.log('begin checkstate');
        let token = this.tokenService.getToken();  
        console.log('after gettoken=',token);


        if (this.tokenService.isValid(token))
          {
            //if (!this._state.value || this._state.value.user_id <=0)
            //{
              let sub = this.sessionService.getContext().subscribe({
                next: data => {
                    if (data)
                    {
                      if (data.apiError)
                      {
                        this.tokenService.removeToken(); //Invalid token or token has been modified.
                        this.resetState();
                        console.log('reload session context error=', data.apiError);
                        sub.unsubscribe();
                      }
                      else{
                      this.setState(data.result);
                      //create clientid in cookies, if it is no longer there for whatever reason.
                      this.cookiesService.initClientId();
                      console.log('valid token=> state needs to be reloaded',this._state.value);
                      this._state.next(this._state.value);
                      observer.next('success');
                      }
                    }
                },
                error: error => {
                    this.tokenService.removeToken(); //Invalid token or token has been modified.
                    this.resetState();
                    console.log('reload session context error=', error);
                    sub.unsubscribe();
                    observer.next('error');
                },
                complete: ()=> {
                  console.log('HELLO update state completed');
                  sub.unsubscribe();                  
                }
              });
            //}
            //else{
            // console.log('valid token',this._state.value);
            // this._state.next(this._state.value);
            //}
          }
        else{

          console.log('Invalid token');
          this.resetState();
          observer.next('reset');
        }
        console.log('completed checkstate');
    });
      
  }

  resetState(){
     this._state.next(this.initState);
  }

  setState(session:Session){
    console.log('set state session=', session);
    this._state.next({
      session_id: session.id,
      user_id: session.userId,
      email:session.email,
      user_name:session.userName,
      first_name: session.first_Name,
      last_name:session.last_Name,
      role:session.role
    });
  }
}
