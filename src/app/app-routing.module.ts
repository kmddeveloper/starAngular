import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {ProductGuard} from 'src/app/core/guards/product.guard';
import {CommonGuard} from 'src/app/core/guards/common.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [

  {
    path: '' , 
    redirectTo: 'home', pathMatch: 'full',
    outlet:"" 
  },
  //{
  //  path: '' , 
   // component:HomeComponent, 
   // outlet:"" 
  //},
  {
    path: 'home' , 
    canActivate: [CommonGuard],
    component:HomeComponent, 
    outlet:"" 
  },
  {
    path: 'product' , 
    canActivate: [CommonGuard],
    loadChildren: ()=> import(`src/app/product/product.module`).then(m=> m.ProductModule),
    outlet:"" 
  },
  {
    path: 'login' , 
    canActivate: [CommonGuard],
    loadChildren: ()=> import(`src/app/login/login.module`).then(m=> m.LoginModule),
    outlet:"" 
  },
  {
    path: 'register' , 
    canActivate: [CommonGuard],
    loadChildren: ()=> import(`src/app/registration/registration.module`).then(m=> m.RegistrationModule),
    outlet:"" 
  },
  {
    path: 'contact' ,
    canActivate: [CommonGuard],   
    component:ContactComponent, 
    outlet:"" 
  },
  {
    path: 'logout' ,
    canActivate: [],   
    component:LogoutComponent, 
    outlet:"" 
  },
  {
     path:'**', //any other route
     canActivate: [CommonGuard],
     component: HomeComponent,
     outlet:"" 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
