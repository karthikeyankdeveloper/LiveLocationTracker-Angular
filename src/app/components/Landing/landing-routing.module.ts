import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './Landing.component';
import { FooterComponent } from '../footer/footer.component';

const routes: Routes = [
  {
    path:'',
    component:LandingComponent,
    children:[
      {
        path:'',
        component:FooterComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
