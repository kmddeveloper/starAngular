import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '' , 
    canActivate: [],
    redirectTo: 'login', pathMatch: 'full',
    outlet:"" 
  },  
  {
    path: 'login' , 
    canActivate: [],
    component: LoginComponent,
    outlet:"" 
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports:[
    RouterModule
  ]
})
export class LoginRoutingModule { }
