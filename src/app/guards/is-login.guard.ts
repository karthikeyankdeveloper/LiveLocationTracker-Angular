import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {

  constructor(private access_service:AccessService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    if(this.access_service.IsLoggedIn()==true){

      this.router.navigate(['']);

      return false;

    }else{
      return true;
    }

  }

}
