import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadComponent:()=>import('./user.component').then(component=>component.UserComponent),
    children:[
      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },
      {
        path:'dashboard',
        loadComponent:()=>import('./dashboard/dashboard.component').then(component=>component.DashboardComponent),
        title:'User | DashBoard'
      },
      {
        path:'info',
        loadComponent:()=>import('./info/info.component').then(component=>component.InfoComponent),
        title:'User | Personal Info'
      },
      {
        path:'buy',
        loadComponent:()=>import('./buy/buy.component').then(component=>component.BuyComponent),
        title:'User | Buy'
      },
      {
        path:'product',
        loadComponent:()=>import('./product/product.component').then(component=>component.ProductComponent),
        title:'User | Product'
      },
      {
        path:'order',
        loadComponent:()=>import('./order/order.component').then(component=>component.OrderComponent),
        title:'User | Orders'
      },
      {
        path:'manage',
        loadComponent:()=>import('./manage/manage.component').then(component=>component.ManageComponent),
        title:'User | Manage Kit'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
