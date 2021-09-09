import { NgModule } from '@angular/core';
import {LoginComponent} from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { AppStateGuard } from '../core/guards/appState.guard';

const routes: Routes = [

  {
    path: '' , 
    canActivate: [],
    redirectTo: 'login', pathMatch: 'full',
    outlet:"" 
  },  
  {
    path: 'login' , 
    canActivate: [AppStateGuard],
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
