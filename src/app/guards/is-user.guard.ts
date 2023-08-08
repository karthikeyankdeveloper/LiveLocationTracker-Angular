import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccessService } from '../services/access.service';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {

  constructor(private accessService:AccessService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if(this.accessService.isUser()==false){
      this.router.navigate([''],{replaceUrl:Environment.conditionTrue});
      return false;
    }
    return true;
  }

}
