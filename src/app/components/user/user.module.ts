import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InfoComponent } from './info/info.component';
import { BuyComponent } from './buy/buy.component';
import { ManageComponent } from './manage/manage.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    UserComponent,
    DashboardComponent,
    InfoComponent,
    BuyComponent,
    ManageComponent,
    OrderComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
