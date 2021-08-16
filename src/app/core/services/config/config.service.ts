//ng g service core/services/env
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { EnvService } from 'src/app/core/services/env/env.service'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _settings:any=null;

  private readonly  _httpClient:HttpClient;

  constructor(httpClient: HttpClient, private envService:EnvService)
   { 
      this._httpClient = httpClient;
   }

  get config (){
    return this._settings;
  }

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
