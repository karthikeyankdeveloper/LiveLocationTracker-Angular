import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private access_service:AccessService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{

    if(this.access_service.IsAdmin()==false){
      this.router.navigate(['']);

      return false;
    }

    return true;
  }

}
