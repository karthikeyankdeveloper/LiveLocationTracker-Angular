import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private userData:any;

  public loadData(load_params:any):void{
    this.userData = load_params;
  }

  public getData():any{
    return this.userData;
  }

  public isLoggedIn():boolean{
    if(this.userData==null){
      return false;
    }
    return true;
  }

  public isAdmin():boolean{
    if(this.userData!=null){
      if(this.userData["role"] == "admin"){
        return true;
      }else{
        return false;
      }
    }
    return false;
  }

  public isUser():boolean{
    if(this.userData!=null){
      if(this.userData["role"] == "user"){
        return true;
      }else{
        return false;
      }
    }

    return false;
  }

  public getEmail():string{
    return (this.userData.email+"");
  }

  public getName():string{
    return (this.userData.name+"");
  }

  public logout():void{
    LoggerService.log("User has been logged out.");
    localStorage.clear();
    this.userData = null;
  }

}
