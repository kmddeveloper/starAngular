
import { Params } from '@angular/router';

 export function toLowerParams (params:Params) {  
        let lowerParams: Params = {};           
        for (const key in params) {
            lowerParams[key.toLowerCase()] = params[key];
        }

    return lowerParams;
    
   }  

   