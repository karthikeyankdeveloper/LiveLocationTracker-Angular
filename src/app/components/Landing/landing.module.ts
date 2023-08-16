import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './Landing.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';


@NgModule({
  declarations: [
    LandingComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class LandingModule { }
