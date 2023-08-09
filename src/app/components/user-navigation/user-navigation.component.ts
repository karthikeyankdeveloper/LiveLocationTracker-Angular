import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {

  protected logoutCondition:boolean = Environment.conditionFalse;

  constructor(private accessService:AccessService,private router:Router,protected loaderService:LoaderService){  }

  protected toggleLogout():void{
    this.logoutCondition = ! this.logoutCondition;
  }

  protected logout():void{
    this.accessService.logout();
    this.toggleLogout();
    this.router.navigate([''],{replaceUrl:Environment.conditionTrue});
  }

}
