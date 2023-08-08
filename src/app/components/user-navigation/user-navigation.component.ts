import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.css']
})
export class UserNavigationComponent {

  protected LogoutToggle = false;

  constructor(private accessService:AccessService,private router:Router,protected loaderService:LoaderService){  }


  protected ToggleLogout(){
    this.LogoutToggle = ! this.LogoutToggle;
  }

  protected Logout(){
    this.accessService.logout();
    this.ToggleLogout();
    this.router.navigate([''],{replaceUrl:true});
  }

}
