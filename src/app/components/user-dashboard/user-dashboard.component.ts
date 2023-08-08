import { Component } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  private getUserSubscription:any;
  private getOrderSubscription:any;

  protected View:boolean=false;

  protected UserData:any;
  protected DeviceCount:any=0;
  protected LastOrder:any;

  public constructor(private accessService:AccessService,private loaderService:LoaderService,private dbService:DBService){

    this.loaderService.setUserLoader(true);

    this.getUserSubscription = dbService.GetUser(accessService.getEmail()).subscribe((data)=>{
      var datas = JSON.parse(JSON.stringify(data));
      Object.assign(datas,{"time":new Date(datas.timestamp)});
      this.UserData = datas;

      if(datas.device!=null){
        this.DeviceCount = Object.keys(datas.device).length;
      }

      if(datas.order!=null){
        var lastorder = Object.keys(datas.order).reverse()[0];

        this.getOrderSubscription = dbService.GetOrder(lastorder).subscribe((orderData)=>{
          var orderjson = JSON.parse(JSON.stringify(orderData));
          Object.assign(orderjson,{orderid:lastorder,time:new Date(orderjson.timestamp)});
          this.LastOrder = orderjson;
          this.makeViewStopLoading();
        });

      }else{
        this.makeViewStopLoading();
      }

    });

  }

  private makeViewStopLoading():void{
    this.loaderService.setUserLoader(false);
    if(!this.View){
      this.View=true;
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
    // console.log("destroyed");
  }



}
