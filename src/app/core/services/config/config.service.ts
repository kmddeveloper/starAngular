//ng g service core/services/env
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { EnvService } from 'src/app/core/services/env/env.service'
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _settings:any=null;

  private readonly  _httpClient:HttpClient;

  constructor(httpClient: HttpClient, private authService:AuthService, private envService:EnvService)
   { 
      this._httpClient = httpClient;
   }

  get config (){
    return this._settings;
  }

  initialize():void{
    let authSub=this.authService.auth('guest','guest').subscribe({
      next: data=>{
          console.log('STARTUP ........data=',data);
      },
      error: error => {
          console.log('Initialize error=', error);
          authSub.unsubscribe();
      },
      complete: ()=> {
        console.log('Initialize completed');
        authSub.unsubscribe();
      }
    });
  };

  loadConfig():Observable<any>{
    return  this._httpClient.get(`${this.envService.apiBaseUrl}/api/user/5`)
            .pipe(tap (value=> console.log('observable', value)));      
  }

  loadConfig_old(){
    return new Promise((resolve, reject)=>{
      this._httpClient
        .get(`${this.envService.apiBaseUrl}/api/user/5`)
        .subscribe((resp:any)=>{
           this._settings = resp;
           console.log("Config loaded:", this._settings);
           resolve(true);
        });
    });

  }
}
