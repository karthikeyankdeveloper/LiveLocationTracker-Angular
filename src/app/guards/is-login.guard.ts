import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AccessService } from '../services/access.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class IsLoginGuard  {

  constructor(private accessService:AccessService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if(this.accessService.isLoggedIn()==true){
      this.router.navigate([''],{replaceUrl:environment.conditionTrue});
      return false;
    }else{
      return true;
    }
  }

}
