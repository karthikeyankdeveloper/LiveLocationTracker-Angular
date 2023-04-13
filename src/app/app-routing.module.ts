import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HeaderComponent } from './components/Header/Header.component';
import { LandingComponent } from './components/Landing/Landing.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportComponent } from './components/support/support.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { IsUserGuard } from './guards/is-user.guard';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { InviteAdminComponent } from './components/invite-admin/invite-admin.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path:'',
    component:HeaderComponent,
    children:[
      {
        path:'',
        component:LandingComponent,
        title:'Tracker | Quality Solution'
      },
      {
        path:'home',
        redirectTo:'',
        pathMatch:'full',
      },
      {
        path:'login',
        component:LoginComponent,
        title:'Tracker | Login',
        canActivate:[IsLoginGuard]
      },
      {
        path:'forgot',
        component:UpdatePasswordComponent,
        title:'Tracker | Update Password',
        canActivate:[IsLoginGuard]
      },
      {
        path:'signup',
        component:SignupComponent,
        title:'Tracker | Create Account',
        canActivate:[IsLoginGuard]
      },
      {
        path:'user',
        component:UserDashboardComponent,
        title:'User | Dashboard',
        canActivate:[IsUserGuard]
      },
      {
        path:'admin',
        component:AdminDashboardComponent,
        canActivate:[IsAdminGuard],
        children:[
          {
            path:'',
            component:AnalyticsComponent,
            title:'Admin | Analytics'
          },
          {
            path:'manageuser',
            component:ManageUserComponent,
            title:'Admin | ManageUser'
          },
          {
            path:'invite',
            component:InviteAdminComponent,
            title:'Admin | Invite'
          },
          {
            path:'order',
            component:OrderComponent,
            title:'Admin | Order'
          }
        ]
      },
      {
        path:'support',
        component:SupportComponent,
        title:'Tracker | Support'
      },
      {
        path:'about',
        component:AboutComponent,
        title:'Tracker | About'
      }
    ]
  },
  {
    path:'**',
    component:NotFoundComponent,
    title:'Tracker | Page Not Found | 404 Error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
