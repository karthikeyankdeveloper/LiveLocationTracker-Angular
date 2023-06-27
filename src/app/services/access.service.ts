import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccessService {

  private UserDatas:any;


  public LoadData(load_params:any){
    this.UserDatas = load_params;
  }

  public GetData(){
    return this.UserDatas;
  }


  public IsLoggedIn():boolean{
    if(this.UserDatas==null){
      return false;
    }

    return true;
  }


  public IsAdmin():boolean{
    if(this.UserDatas!=null){
      if(this.UserDatas["role"] == "admin"){
        return true;
      }else{
        return false;
      }
    }

    return false;
  }


  public IsUser():boolean{
    if(this.UserDatas!=null){
      if(this.UserDatas["role"] == "user"){
        return true;
      }else{
        return false;
      }
    }

    return false;
  }

  public GetEmail(){
    return (this.UserDatas.email+"");
  }

  public GetName(){
    return (this.UserDatas.name+"");
  }


  public Logout(){
    console.log("session logout");
    localStorage.clear();
    this.UserDatas = null;
  }

}
