import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpTokenInterceptor} from './core/interceptors/http-token.interceptor'
import { HomeComponent } from './home/home.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { ContactComponent } from './contact/contact.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigService} from 'src/app/core/services/config/config.service';
import {TokenService} from 'src/app/core/services/token/token.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


console.log('app module loaded');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CopyrightComponent,
    ContactComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
    
  ],
  providers: [
              {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi:true }, //Can have more than one.
              {provide: APP_INITIALIZER, useFactory:configFactory, multi: true, deps:[ConfigService,TokenService]}
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configFactory(configService:ConfigService, tokenService:TokenService){    
    var token = tokenService.getToken();
    console.log("configFactory is called.");
    if (tokenService.isValid(token))
    {
      /*
      console.log('creating new token!');
      return ()=>     

      tokenService.new().subscribe({
        next: token => {          
          tokenService.set(token);
          configService.loadConfig().subscribe( x=> {
            console.log('loadconfig1', x);
            }, 
            error=> {console.log(error)},
            () => {}
            )
        },
        error: error => {
            console.log(error);
        },
        complete: ()=> {

        }

      });
      */
          //tokenService.new().subscribe(x=>{          
           // tokenService.set(x);
           // configService.loadConfig1().subscribe( x=> {
           //   console.log('loadconfig1', x);
           // });        
           //}
           //);
    }
    return ()=>null;

}

