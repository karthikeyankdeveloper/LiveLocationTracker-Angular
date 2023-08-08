import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {

  protected TotalUser:number = 0;
  protected TotalBlockeduser:number = 0;
  protected TotalAdmin:number = 0;
  protected TotalBlockedadmin:number = 0;
  protected TodayOrder:number = 0;
  protected TotalOrder:number = 0;
  protected TotalPendingOrder:number = 0;
  protected TotalDoneOrder:number = 0;

  private getAllUserDataSubscription:any;
  private getAllOrderSubscription:any;

  constructor(private databaseService:DatabaseService,private loaderService:LoaderService){

    this.loaderService.setLoader(true);

    this.getAllUserDataSubscription = this.databaseService.GetAllUserData().subscribe((data)=>{
      this.loaderService.setLoader(false);
      for(let dbvalue of Object.values(data)){
        if(dbvalue.role=="admin" && dbvalue.block==false){
          this.TotalAdmin++;
        }
        else if(dbvalue.role=="admin" && dbvalue.block==true){
          this.TotalBlockedadmin++;
        }
        else if(dbvalue.role=="user" && dbvalue.block==false){
          this.TotalUser++;
        }
        else if(dbvalue.role=="user" && dbvalue.block==true){
          this.TotalBlockeduser++;
        }
      }

    });

    let todaydateinstance = new Date();
    let year = todaydateinstance.getFullYear().toString();
    let month = (todaydateinstance.getMonth()+1).toString().padStart(2,"0");
    let date = todaydateinstance.getDate().toString().padStart(2,"0");
    let todaydate = date+month+year;

    this.getAllOrderSubscription = this.databaseService.GetAllOrder().subscribe((data)=>{
      var values = Object.values(data);
      this.TotalOrder = values.length;

      for(let dbval of values){
        var remotedateinstance = new Date(dbval?.["timestamp"]);
        var year = remotedateinstance.getFullYear().toString();
        var month = (remotedateinstance.getMonth()+1).toString().padStart(2,"0");
        var date = remotedateinstance.getDate().toString().padStart(2,"0");
        var remotedate = date+month+year;

        if(todaydate==remotedate){
          this.TodayOrder++;
        }

        if(dbval?.["status"]){
          this.TotalDoneOrder++;
        }else{
          this.TotalPendingOrder++;
        }

      }

    });

  }

  ngOnDestroy(){
    if(this.getAllOrderSubscription){
      this.getAllOrderSubscription.unsubscribe();
    }
    if(this.getAllUserDataSubscription){
      this.getAllUserDataSubscription.unsubscribe();
    }
  }

}
