//ng g m  product/product-routing --flat --module=product  

import { NgModule } from '@angular/core';
import {  RouterModule, Routes, } from '@angular/router';
import { ProductGuard } from '../core/guards/product.guard';
import {CommonGuard } from '../core/guards/common.guard';
import { ProductComponent } from './product.component';

const routes: Routes = [

  {
    path: '' , 
    canActivate: [CommonGuard, ProductGuard],
    redirectTo: 'product', pathMatch: 'full',
    outlet:"" 
  },  
  {
    path: 'product' , 
    canActivate: [CommonGuard, ProductGuard],
    component: ProductComponent,
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
