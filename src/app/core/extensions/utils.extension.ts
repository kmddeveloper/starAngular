import { Params } from '@angular/router';

   declare module '@angular/router' {
    interface String {  
        toLowerParams(): this;  
       }  
  }