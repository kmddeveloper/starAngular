//ng g m shared/shared --flat -m=product
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from './star.component';
import { DashToSpacePipe } from '../core/pipes/dash-to-space.pipe';

@NgModule({
  declarations: [
    StarComponent,
    DashToSpacePipe
  ],
  imports: [
    CommonModule,    
  ],
  exports:[   
    CommonModule,
    DashToSpacePipe,
    StarComponent
  ]
})
export class SharedModule { }
