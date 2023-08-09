import { Component, OnDestroy } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent implements OnDestroy{

  protected totalUser:number = 0;
  protected totalBlockeduser:number = 0;
  protected totalAdmin:number = 0;
  protected totalBlockedadmin:number = 0;
  protected todayOrder:number = 0;
  protected totalOrder:number = 0;
  protected totalPendingOrder:number = 0;
  protected totalDoneOrder:number = 0;

  private getAllUserDataSubscription:any;
  private getAllOrderSubscription:any;

  constructor(private databaseService:DatabaseService,private loaderService:LoaderService){
    this.loaderService.setLoader(true);

    this.getAllUserDataSubscription = this.databaseService.GetAllUserData().subscribe((data)=>{
      this.loaderService.setLoader(false);
      for(let dbvalue of Object.values(data)){
        if(dbvalue.role=="admin" && dbvalue.block==false){
          this.totalAdmin++;
        }
        else if(dbvalue.role=="admin" && dbvalue.block==true){
          this.totalBlockedadmin++;
        }
        else if(dbvalue.role=="user" && dbvalue.block==false){
          this.totalUser++;
        }
        else if(dbvalue.role=="user" && dbvalue.block==true){
          this.totalBlockeduser++;
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
      this.totalOrder = values.length;

      for(let dbval of values){
        var remotedateinstance = new Date(dbval?.["timestamp"]);
        var year = remotedateinstance.getFullYear().toString();
        var month = (remotedateinstance.getMonth()+1).toString().padStart(2,"0");
        var date = remotedateinstance.getDate().toString().padStart(2,"0");
        var remotedate = date+month+year;

        if(todaydate==remotedate){
          this.todayOrder++;
        }

        if(dbval?.["status"]){
          this.totalDoneOrder++;
        }else{
          this.totalPendingOrder++;
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
