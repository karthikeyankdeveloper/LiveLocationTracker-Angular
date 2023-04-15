import { Component } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent {

  public TotalUser = 0;
  public TotalBlockeduser = 0;
  public TotalAdmin = 0;
  public TotalBlockedadmin = 0;
  public TodayOrder = 0;
  public TotalOrder = 0;

  constructor(private dbservice:DBService,private loader:LoaderService){

    loader.SetSampleLoader(true);

    dbservice.GetAllUserData().subscribe((data)=>{

      loader.SetSampleLoader(false);

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



    var dateinstance = new Date();
    var year = dateinstance.getFullYear().toString();
    var month = (dateinstance.getMonth()+1).toString().padStart(2,"0");
    var date = dateinstance.getDate().toString().padStart(2,"0");
    var ref = date+month+year;

    dbservice.GetAllOrder().subscribe((data)=>{

      var values = Object.values(data);

      this.TotalOrder = values.length;

      for(let dbval of values){
        if(dbval?.["ref"]==ref){
          this.TodayOrder++;
        }
      }

    });




  }

}
