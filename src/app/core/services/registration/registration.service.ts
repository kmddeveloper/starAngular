//ng g service core/services/registration
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { EnvService } from 'src/app/core/services/env/env.service';
import { HttpService } from 'src/app/core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpService: HttpService,private envService:EnvService) { }

  register(user:User):Observable<User>{

    return this.httpService.postAsync<User>(`${this.envService.apiBaseUrl}/api/registration`, {email:user.email, password:user.password, first_name:user.firstName,last_Name:user.lastName });
    
  }
}
