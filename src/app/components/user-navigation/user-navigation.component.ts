import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {

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
