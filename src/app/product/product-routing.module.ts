//ng g m  product/product-routing --flat --module=product  

import { NgModule } from '@angular/core';
import {  RouterModule, Routes, } from '@angular/router';
import { ProductGuard } from '../core/guards/product.guard';
import {AppStateGuard } from '../core/guards/appState.guard';
import { ProductComponent } from './product.component';
import { EditComponent } from './edit.component';
import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [

  {
    path: '' , 
    canActivate: [AppStateGuard],
    redirectTo: 'product', pathMatch: 'full',
    outlet:"" 
  },  
  {
    path: 'product' , 
    canActivate: [AppStateGuard, ProductGuard],
    component: ProductComponent,
    outlet:"" 
  },
  {
    path: 'product-detail' , 
    canActivate: [AppStateGuard],
    component: ProductDetailComponent,
    outlet:"" 
  },
  {
    path: 'edit' , 
    canActivate: [AppStateGuard],
    component: EditComponent,
    outlet:"" 
  },
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[

    RouterModule,    
  ]
})
export class ProductRoutingModule { }
