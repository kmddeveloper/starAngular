import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {ProductGuard} from 'src/app/core/guards/product.guard';
import {AppStateGuard} from 'src/app/core/guards/appState.guard';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';

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
    canActivate: [AppStateGuard],
    component:HomeComponent, 
    outlet:"" 
  },
  {
    path: 'product' , 
    canActivate: [AppStateGuard],
    loadChildren: ()=> import(`src/app/product/product.module`).then(m=> m.ProductModule),
    outlet:"" 
  },
  {
    path: 'cart' , 
    canActivate: [AppStateGuard],
    component:CartComponent,
    outlet:"" 
  },
  {
    path: 'login' , 
    canActivate: [AppStateGuard],
    loadChildren: ()=> import(`src/app/login/login.module`).then(m=> m.LoginModule),
    outlet:"" 
  },
  {
    path: 'register' , 
    canActivate: [AppStateGuard],
    loadChildren: ()=> import(`src/app/registration/registration.module`).then(m=> m.RegistrationModule),
    outlet:"" 
  },
  {
    path: 'contact' ,
    canActivate: [AppStateGuard],   
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
     canActivate: [AppStateGuard],
     component: HomeComponent,
     outlet:"" 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
