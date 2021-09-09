//ng g m shared/shared --flat -m=product
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from './star.component';
import { DashToSpacePipe } from '../core/pipes/dash-to-space.pipe';
import { BackComponent } from './back.component';


@NgModule({
  declarations: [
    StarComponent,
    DashToSpacePipe,
    BackComponent
  ],
  imports: [
    CommonModule,    
  ],
  exports:[   
    CommonModule,
    DashToSpacePipe,
    StarComponent,
    BackComponent
  ]
})
export class SharedModule { }
