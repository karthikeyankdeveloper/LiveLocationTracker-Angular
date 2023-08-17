import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class UserComponent {
  protected logoutCondition:boolean = environment.conditionFalse;
  constructor(private accessService:AccessService,private router:Router,protected loaderService:LoaderService){  }
  protected toggleLogout():void{
    this.logoutCondition = ! this.logoutCondition;
  }
  protected logout():void{
    this.accessService.logout();
    this.toggleLogout();
    this.router.navigate([''],{replaceUrl:environment.conditionTrue});
  }
}
