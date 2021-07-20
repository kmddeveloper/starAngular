import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import {ProductGuard} from 'src/app/core/guards/product.guard';

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
    component:HomeComponent, 
    outlet:"" 
  },
  {
    path: 'product' , 
    canActivate: [ProductGuard],
    loadChildren: ()=> import(`src/app/product/product.module`).then(m=> m.ProductModule),
    outlet:"" 
  },
  {
    path: 'contact' ,   
    component:ContactComponent, 
    outlet:"" 
  },
  {
     path:'**', //any other route
     component: HomeComponent,
     outlet:"" 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
