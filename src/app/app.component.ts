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
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  public isUpdate:any = false;

  constructor(private accessService:AccessService,private databaseService:DatabaseService){

    this.databaseService.checkDatabase().subscribe((data)=>{
      this.isUpdate = data;
    });

    if(localStorage.getItem("llt-date")!=((new Date()).getDate()+"")){
      console.log("session expired");
      this.accessService.Logout();
    }else{
      console.log("session available");
      var json = JSON.parse(localStorage.getItem("llt-userdata")+"");
      if(json!=null || json!=""){
        this.accessService.LoadData(json);
      }
    }


  }

}
