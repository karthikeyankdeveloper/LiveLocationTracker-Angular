import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccessService } from './services/access.service';
import { LoaderService } from './services/loader.service';
import { IsLoginGuard } from './guards/is-login.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsUserGuard } from './guards/is-user.guard';
import { CryptographyService } from './services/cryptography.service';
import { RouterModule } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './components/Header/Header.component';
import { LandingComponent } from './components/Landing/Landing.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),


  ],
  providers: [AccessService,LoaderService,CryptographyService,IsLoginGuard,IsAdminGuard,IsUserGuard,DatabaseService,LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
