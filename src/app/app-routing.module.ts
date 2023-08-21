import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsAdminGuard } from './guards/is-admin.guard';
import { IsLoginGuard } from './guards/is-login.guard';
import { IsUserGuard } from './guards/is-user.guard';


const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./components/Header/Header.component').then(component=>component.HeaderComponent),
    children:[
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      },
      {
        path:'home',
        loadComponent:()=>import('./components/Landing/Landing.component').then(component=>component.LandingComponent),
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
    canActivate:[IsUserGuard],
    loadChildren:()=>import('./components/user/user.module').then(module=>module.UserModule)
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
