//ng g service core/services/utils
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


   convertStringToNumber(input: string):number { 
    
    if (!input) return NaN;

    if (input.trim().length==0) { 
        return NaN;
    }
    return Number(input);
  }

  compareStrings (string1:string, string2:string, ignoreCase:boolean, useLocale:boolean=false) {
    if (ignoreCase) {
        if (useLocale) {
            string1 = string1.toLocaleLowerCase();
            string2 = string2.toLocaleLowerCase();
        }
        else {
            console.log('string1', string1);
            console.log('string2', string2);
            string1 = string1.toLowerCase();
            string2 = string2.toLowerCase();
        }
    }

    return string1 === string2;
}

}
