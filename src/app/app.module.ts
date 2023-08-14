import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/Header.component';
import { LandingComponent } from './components/Landing/Landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportComponent } from './components/support/support.component';
import { AboutComponent } from './components/about/about.component';
import {HttpClientModule} from '@angular/common/http';
import { UpdatingServiceAlertComponent } from './components/updating-service-alert/updating-service-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessService } from './services/access.service';
import { LoaderService } from './services/loader.service';
import { IsLoginGuard } from './guards/is-login.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { MapComponent } from './components/map/map.component';
import { AdminAnalyticsComponent } from './components/admin-analytics/admin-analytics.component';
import { AdminKitComponent } from './components/admin-kit/admin-kit.component';
import { AdminManageAllComponent } from './components/admin-manage-all/admin-manage-all.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminInviteComponent } from './components/admin-invite/admin-invite.component';
import { AdminViewkitComponent } from './components/admin-viewkit/admin-viewkit.component';
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
import { NotFoundComponent } from './components/NotFound/NotFound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    SupportComponent,
    AboutComponent,
    UpdatingServiceAlertComponent,
    AdminDashboardComponent,
    FooterComponent,
    UpdatePasswordComponent,
    MapComponent,
    AdminAnalyticsComponent,
    AdminKitComponent,
    AdminManageAllComponent,
    AdminOrderComponent,
    AdminInviteComponent,
    AdminViewkitComponent,
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
