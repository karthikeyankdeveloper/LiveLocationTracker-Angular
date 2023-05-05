import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/Header/Header.component';
import { LandingComponent } from './components/Landing/Landing.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportComponent } from './components/support/support.component';
import { AboutComponent } from './components/about/about.component';
import {HttpClientModule} from '@angular/common/http';
import { UpdatingServiceAlertComponent } from './components/updating-service-alert/updating-service-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessService } from './services/access.service';
import { DBService } from './services/db.service';
import { LoaderService } from './services/loader.service';
import { IsLoginGuard } from './guards/is-login.guard';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
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
import { UserKitComponent } from './components/user-kit/user-kit.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    SupportComponent,
    AboutComponent,
    UpdatingServiceAlertComponent,
    UserDashboardComponent,
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
    UserKitComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AccessService,DBService,LoaderService,IsLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
