import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnalyticsComponent } from './analytics/analytics.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        component:AnalyticsComponent,
        title:'Admin | Analytics'
      },
      {
        path:'manageuser',
        loadComponent:()=>import('./manage/manage.component').then(component=>component.ManageComponent),
        title:'Admin | Manage'
      },
      {
        path:'invite',
        loadComponent:()=>import('./invite/invite.component').then(component=>component.InviteComponent),
        title:'Admin | Invite'
      },
      {
        path:'order',
        loadComponent:()=>import('./order/order.component').then(component=>component.OrderComponent),
        title:'Admin | Order'
      },
      {
        path:'kit',
        loadComponent:()=>import('./kit/kit.component').then(component=>component.KitComponent),
        title:'Admin | Kit'
      },
      {
        path:'viewkit',
        loadComponent:()=>import('./viewkit/viewkit.component').then(component=>component.ViewkitComponent),
        title:'Admin | ViewKit'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
