import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/Header.component';
import {HttpClientModule} from '@angular/common/http';
import { UpdatingServiceAlertComponent } from './components/updating-service-alert/updating-service-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessService } from './services/access.service';
import { LoaderService } from './services/loader.service';
import { IsLoginGuard } from './guards/is-login.guard';
import { UserNavigationComponent } from './components/user-navigation/user-navigation.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserBuyComponent } from './components/user-buy/user-buy.component';
import { UserProductComponent } from './components/user-product/user-product.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { UserManageComponent } from './components/user-manage/user-manage.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsUserGuard } from './guards/is-user.guard';
import { CryptographyService } from './services/cryptography.service';
import { RouterModule } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UpdatingServiceAlertComponent,
    UserNavigationComponent,
    UserDashboardComponent,
    UserInfoComponent,
    UserBuyComponent,
    UserProductComponent,
    UserOrdersComponent,
    UserManageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccessService,LoaderService,CryptographyService,IsLoginGuard,IsAdminGuard,IsUserGuard,DatabaseService,LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
