/*
Title: Live Location Tracker
Author: Karthikeyan
Created at: 06/03/2023
Updated at: 08/08/2023
Reviewed by: --
Reviewed at: --
*/
import { Component } from '@angular/core';
import { AccessService } from './services/access.service';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  public isupdate:any = false;

  constructor(private db:DBService,private access_service:AccessService){
    db.DBcheck().subscribe((data)=>{
      this.isupdate = data;
    });

    if(localStorage.getItem("llt-date")!=((new Date()).getDate()+"")){
      console.log("session expired");
      access_service.Logout();
    }else{
      console.log("session available");
      var json = JSON.parse(localStorage.getItem("llt-userdata")+"");
      if(json!=null || json!=""){
        access_service.LoadData(json);
      }
    }


  }

}
