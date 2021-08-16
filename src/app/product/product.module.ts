//ng g m product/product --flat -m app     (-m app indicates to import it into the app module)

import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';

import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule} from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';



console.log('product module loaded');


@NgModule({
  declarations: [
    ProductComponent,
    
  ],
  imports: [
    MatProgressSpinnerModule,  
    ProductRoutingModule,
    SharedModule,
    MatPaginatorModule,
  

  
  ],
  exports:[

  ]
})
export class ProductModule { }
