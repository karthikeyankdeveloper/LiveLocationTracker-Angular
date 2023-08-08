import { Component } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css']
})
export class AdminAnalyticsComponent {

  public TotalUser = 0;
  public TotalBlockeduser = 0;
  public TotalAdmin = 0;
  public TotalBlockedadmin = 0;
  public TodayOrder = 0;
  public TotalOrder = 0;
  public TotalPendingOrder = 0;
  public TotalDoneOrder = 0;

  constructor(private dbservice:DBService,private loader:LoaderService){

    loader.setLoader(true);

    dbservice.GetAllUserData().subscribe((data)=>{

      loader.setLoader(false);

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



    var todaydateinstance = new Date();
    var year = todaydateinstance.getFullYear().toString();
    var month = (todaydateinstance.getMonth()+1).toString().padStart(2,"0");
    var date = todaydateinstance.getDate().toString().padStart(2,"0");
    var todaydate = date+month+year;

    dbservice.GetAllOrder().subscribe((data)=>{

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

}
