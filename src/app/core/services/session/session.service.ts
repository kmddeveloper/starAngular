import { Injectable } from '@angular/core';
import { EndpointService } from 'src/app/core/services/endpoint/endpoint.service';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Session } from 'src/app/core/models/Session';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private endpointService:EndpointService, private httpService:HttpService) { }

  getContext():Observable<ApiResponse<Session>>{

    return this.httpService.getAsync<ApiResponse<Session>>(`${this.endpointService.sessionContext}`);
  
  }
}
