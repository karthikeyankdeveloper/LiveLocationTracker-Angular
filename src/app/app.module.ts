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
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { InviteAdminComponent } from './components/invite-admin/invite-admin.component';
import { OrderComponent } from './components/order/order.component';
import { KitComponent } from './components/kit/kit.component';
import { ViewkitComponent } from './components/viewkit/viewkit.component';

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
    ManageUserComponent,
    AnalyticsComponent,
    UpdatePasswordComponent,
    InviteAdminComponent,
    OrderComponent,
    KitComponent,
    ViewkitComponent
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
