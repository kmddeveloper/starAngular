import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Session } from 'src/app/core/models/Session';
import {State} from 'src/app/core/models/State';
import { TokenService } from 'src/app/core/services/token/token.service';
import { SessionService } from 'src/app/core/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state = new BehaviorSubject<State>(this.initState);

  public state$ =  this._state.asObservable();

  constructor(private tokenService:TokenService, private sessionService:SessionService) {}

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

  updateState(){
    console.log('begin checkstate');
    let token = this.tokenService.getToken();  
    console.log('after gettoken=',token);
    if (this.tokenService.isValid(token))
      {
        //if (!this._state.value || this._state.value.user_id <=0)
        //{
          let sub = this.sessionService.getContext().subscribe({
            next: session => {
                this.setState(session);
                console.log('valid token=> state needs to be reloaded',this._state.value);
                this._state.next(this._state.value);
            },
            error: error => {
                this.tokenService.removeToken(); //Invalid token or token has been modified.
                this.resetState();
                console.log('reload session context error=', error);
                sub.unsubscribe();
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
    }
    console.log('completed checkstate');
      
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
