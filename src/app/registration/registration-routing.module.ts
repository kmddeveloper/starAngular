import { NgModule } from '@angular/core';
import {RouterModule,  Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';

const routes: Routes = [

  {
    path: '' , 
    canActivate: [],
    redirectTo: 'register', pathMatch: 'full',
    outlet:"" 
  },  
  {
    path: 'register' , 
    canActivate: [],
    component: RegistrationComponent,
    outlet:"" 
  }
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    CommonModule,
    RouterModule
  ]
})
export class RegistrationRoutingModule { }
