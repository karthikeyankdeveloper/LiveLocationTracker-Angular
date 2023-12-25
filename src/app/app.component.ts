/*
Title: Live Location Tracker
Author: Karthikeyan
Created at: 06/03/2023
Updated at: 25/12/2023
Reviewed by: --
Reviewed at: --
*/
import { Component } from '@angular/core';
import { AccessService } from './services/access.service';
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';
import { environment } from 'src/environments/environment';
import { UpdateService } from './SwUpdate/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  public isUpdate:any = environment.conditionFalse;
  constructor(private databaseService:DatabaseService,private accessService:AccessService,private updateService:UpdateService){
    this.updateService.checkForUpdate();
    this.databaseService.checkDatabase().subscribe((data)=>{
      this.isUpdate = data;
    });

    if(localStorage.getItem("llt-date")!=((new Date()).getDate()+"")){
      LoggerService.info("User session expired. Automatically logged out for security reasons.");
      this.accessService.logout();
    }else{
      LoggerService.info("Session available");
      var json = JSON.parse(localStorage.getItem("llt-userdata")+"");
      if(json!=null || json!=""){
        this.accessService.loadData(json);
      }
    }
  }
}
