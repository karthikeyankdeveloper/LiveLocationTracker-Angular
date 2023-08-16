import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/Header/Header.component';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { IsUserGuard } from './guards/is-user.guard';
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
        redirectTo:'/home',
        pathMatch:'full'
      },
      {
        path:'home',
        loadChildren:()=>import('./components/Landing/landing.module').then(module=>module.LandingModule),
        title:'Tracker | Quality Solution',
      },
      {
        path:'login',
        loadComponent:()=>import('./components/login/login.component').then(component=>component.LoginComponent),
        title:'Tracker | Login',
        canActivate:[IsLoginGuard]
      },
      {
        path:'forgot',
        loadComponent:()=>import('./components/update-password/update-password.component').then(component=>component.UpdatePasswordComponent),
        title:'Tracker | Update Password'
      },
      {
        path:'signup',
        loadComponent:()=>import('./components/signup/signup.component').then(component=>component.SignupComponent),
        title:'Tracker | Create Account',
        canActivate:[IsLoginGuard]
      },
      {
        path:'support',
        loadComponent:()=>import('./components/support/support.component').then(component=>component.SupportComponent),
        title:'Tracker | Support'
      },
      {
        path:'about',
        loadComponent:()=>import('./components/about/about.component').then(component=>component.AboutComponent),
        title:'Tracker | About'
      },
      {
        path:'admin',
        canActivate:[IsAdminGuard],
        loadChildren:()=>import('./components/admin/admin.module').then(module=>module.AdminModule)
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
    loadComponent:()=>import('./components/map/map.component').then(component=>component.MapComponent),
    title:'Tracker | Map'
  },
  {
    path:'**',
    loadComponent : ()=>import('./components/NotFound/NotFound.component').then(component=>component.NotFoundComponent),
    title:'Tracker | Page Not Found | 404 Error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
