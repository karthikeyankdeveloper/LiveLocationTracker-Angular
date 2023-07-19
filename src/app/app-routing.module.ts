import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/Header/Header.component';
import { LandingComponent } from './components/Landing/Landing.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/NotFound/NotFound.component';
import { SignupComponent } from './components/signup/signup.component';
import { SupportComponent } from './components/support/support.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { IsUserGuard } from './guards/is-user.guard';
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
        title:'Tracker | Update Password'
      },
      {
        path:'signup',
        component:SignupComponent,
        title:'Tracker | Create Account',
        canActivate:[IsLoginGuard]
      },
      {
        path:'admin',
        component:AdminDashboardComponent,
        canActivate:[IsAdminGuard],
        children:[
          {
            path:'',
            component:AdminAnalyticsComponent,
            title:'Admin | Analytics'
          },
          {
            path:'manageuser',
            component:AdminManageAllComponent,
            title:'Admin | ManageUser'
          },
          {
            path:'invite',
            component:AdminInviteComponent,
            title:'Admin | Invite'
          },
          {
            path:'order',
            component:AdminOrderComponent,
            title:'Admin | Order'
          },
          {
            path:'kit',
            component:AdminKitComponent,
            title:'Admin | Kit'
          },
          {
            path:'viewkit',
            component:AdminViewkitComponent,
            title:'Admin | ViewKit'
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
    path:'user',
    component:UserNavigationComponent,
    canActivate:[IsUserGuard],
    children:[
      {
        path:'',
        redirectTo:'dash',
        pathMatch:'full'
      },
      {
        path:'dash',
        component:UserDashboardComponent,
        title:'User | DashBoard'
      },
      {
        path:'info',
        component:UserInfoComponent,
        title:'User | Personal Info'
      },
      {
        path:'buy',
        component:UserBuyComponent,
        title:'User | Buy'
      },
      {
        path:'product',
        component:UserProductComponent,
        title:'User | Product'
      },
      {
        path:'orders',
        component:UserOrdersComponent,
        title:'User | Orders'
      },
      {
        path:'manage',
        component:UserManageComponent,
        title:'User | Manage Kit'
      }

    ]
  },
  {
    path:'map',
    component:MapComponent,
    title:'Tracker | Map'
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
