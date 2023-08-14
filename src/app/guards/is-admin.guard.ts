import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AccessService } from '../services/access.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private accessService:AccessService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
    if(this.accessService.isAdmin()==false){
      this.router.navigate([''],{replaceUrl:environment.conditionTrue});
      return false;
    }
    return true;
  }

}
