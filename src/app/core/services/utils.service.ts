import { Injectable } from '@angular/core';
import { Params, ParamMap} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

    toLower(params: ParamMap):Params {
    const  lowerParams: Params = {};
    for (const key in params) {
        console.log('key=', key);        
        lowerParams[key.toLowerCase()] = params[key];
    }
    console.log('lowerParams inside2',lowerParams);
    return lowerParams;
   }
}
