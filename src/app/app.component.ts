/*
Title: Live Location Tracker
Author: Karthikeyan
Created at: 06/03/2023
Updated at: 23/10/2023
Reviewed by: --
Reviewed at: --
*/
import { Component, OnInit } from '@angular/core';
import { AccessService } from './services/access.service';
import { DatabaseService } from './services/database.service';
import { LoggerService } from './services/logger.service';
import { environment } from 'src/environments/environment';
import { UpdateService } from './services/update.service';
import { ToastrService } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isUpdate:any = environment.conditionFalse;
  constructor(private databaseService:DatabaseService,private accessService:AccessService,private updateService:UpdateService,private toastr:ToastrService){
    // toaster.success("message","Login");
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
  ngOnInit(): void {

    // this.toastr.success(
    //   "message",
    //   'login',
    //   {
    //     timeOut: 3000,
    //     progressBar: true,
    //     progressAnimation: 'decreasing',
    //     positionClass: 'toast-top-right',
    //     messageClass: 'toast-message',
    //   }
    // );
  }

  ngOnDestroy(){
    this.toastr.error("Error");
  }

  public cccc(){
    console.log("Check Executes");
    this.updateService.checkForUpdate().then((chek)=>{
      console.log("CheckForUpdate",chek);
    });
  }

  public aaaa(){
    this.toastr.error('Error');

  }

  public reload(){
    document.location.reload();
  }
}


