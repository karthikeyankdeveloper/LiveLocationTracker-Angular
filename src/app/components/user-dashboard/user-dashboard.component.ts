import { Component, OnDestroy } from '@angular/core';
import { Environment } from 'src/app/environment';
import { AccessService } from 'src/app/services/access.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnDestroy {

  private getUserSubscription:any;
  private getOrderSubscription:any;
  protected view:boolean=Environment.conditionFalse;
  protected userData:any;
  protected deviceCount:number=0;
  protected lastOrder:any;

  constructor(private accessService:AccessService,private loaderService:LoaderService,private databaseService:DatabaseService){
    this.loaderService.setUserLoader(true);

    this.getUserSubscription = this.databaseService.GetUser(this.accessService.getEmail()).subscribe((data)=>{
      var jsonData = JSON.parse(JSON.stringify(data));
      Object.assign(jsonData,{"time":new Date(jsonData.timestamp)});
      this.userData = jsonData;

      if(jsonData.device!=null){
        this.deviceCount = Object.keys(jsonData.device).length;
      }

      if(jsonData.order!=null){
        var lastorderTemp = Object.keys(jsonData.order).reverse()[0];
        this.getOrderSubscription = this.databaseService.GetOrder(lastorderTemp).subscribe((orderData)=>{
          var orderJson = JSON.parse(JSON.stringify(orderData));
          Object.assign(orderJson,{orderid:lastorderTemp,time:new Date(orderJson.timestamp)});
          this.lastOrder = orderJson;
          this.makeViewStopLoading();
        });

      }else{
        this.makeViewStopLoading();
      }

    });

  }

  private makeViewStopLoading():void{
    this.loaderService.setUserLoader(false);
    if(!this.view){
      this.view=true;
    }
  }

  ngOnDestroy(){
    if(this.getUserSubscription){
      this.getUserSubscription.unsubscribe();
    }
    if(this.getOrderSubscription){
      this.getOrderSubscription.unsubscribe();
    }
    this.makeViewStopLoading();
  }

}
