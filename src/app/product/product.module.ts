//ng g m product/product --flat -m app     (-m app indicates to import it into the app module)

import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';

import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule} from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './product-detail.component';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxImgZoomModule  } from 'ngx-img-zoom';

console.log('product module loaded');


@NgModule({
  declarations: [
    ProductComponent,
    EditComponent,
    ProductDetailComponent,    
  ],
  imports: [
    MatProgressSpinnerModule,  
    ProductRoutingModule,
    SharedModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgxUsefulSwiperModule,
    NgxImgZoomModule
  ],
  exports:[
    ReactiveFormsModule
  ]
})
export class ProductModule { }
