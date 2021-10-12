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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './shared/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { TokenService } from './core/services/token/token.service';
import { LogoutComponent } from './logout/logout.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './shared/modal.component';
import { CookiesService } from './core/services/cookies/cookies.service';
import { CartComponent } from './cart/cart.component';


console.log('app module loaded');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CopyrightComponent,
    ContactComponent,
    NavComponent,
    LogoutComponent,
    ModalComponent,
    CartComponent
    
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
 

    
  ],
  providers: [
              {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi:true }, //Can have more than one.
              {provide: APP_INITIALIZER, useFactory:configFactory, multi: true, deps:[ConfigService,TokenService,CookiesService]}             
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function configFactory(configService:ConfigService, tokenService:TokenService, cookiesService:CookiesService ){    
    
    console.log("configFactory is called.");
    cookiesService.initClientId();
    
    return ()=> 
    {
      var token = tokenService.getToken();
      if (!tokenService.isValid(token))
      {
          configService.initialize();      
      }
    }
     
}

