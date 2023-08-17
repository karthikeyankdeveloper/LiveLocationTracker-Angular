import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class OrderComponent implements OnDestroy{
  protected view:boolean = environment.conditionFalse;
  protected finalOrderData:any;
  private serverTime:any;
  private getTimeSubscription:any;
  private getUserSubscription:any;
  private getOrderSubscription:any;

  constructor(private loaderService:LoaderService,private databaseService:DatabaseService,private accessService:AccessService){
    this.initialize();
  }

  private initialize():void{
    this.loaderService.setUserLoader(true);
    this.getTimeSubscription = this.databaseService.getTimestamp().subscribe((responseTime)=>{
      this.serverTime = responseTime;
      this.getUserSubscription = this.databaseService.getUser(this.accessService.getEmail()).subscribe((userData)=>{
        let userDataJson = JSON.parse(JSON.stringify(userData));
        if(userDataJson?.order!=null){
          let final_order_data:any = [];
          for(let values of Object.values(userDataJson.order)){
            this.getOrderSubscription = this.databaseService.getOrder(values+"").subscribe((response)=>{
              var response_modified = JSON.parse(JSON.stringify(response));
              const diffrence_time_Ms = this.serverTime-response_modified.timestamp;
              const twenty_four_fours_Ms = 24 * 60 * 60 * 1000;
              Object.assign(response_modified,{orderid:values,date:new Date(response_modified.timestamp),cancel:diffrence_time_Ms<=twenty_four_fours_Ms});
              final_order_data.push(response_modified);
            });
          }

          setTimeout(()=>{
            for (let index = 0; index < final_order_data.length; index++) {
              for (let subindex = index + 1; subindex < final_order_data.length; subindex++) {
                if (final_order_data[index].timestamp < final_order_data[subindex].timestamp) {
                  const temp = final_order_data[index];
                  final_order_data[index] = final_order_data[subindex];
                  final_order_data[subindex] = temp;
                }
              }
            }
            this.finalOrderData = final_order_data;
            this.makeViewStopLoading();
          },1500);
        }else{
          this.makeViewStopLoading();
        }

      });
    });

  }

  protected cancelOrder(uid:any,orderid:any,kitid:any):void{
    if(confirm("Confirm Cancellation")){
      this.loaderService.setUserLoader(true);
      this.databaseService.deleteUserDevice(this.accessService.getEmail(),uid).subscribe((response)=>{});
      this.databaseService.deleteRemote(uid).subscribe((response)=>{ LoggerService.log("Device Deleted"); });
      this.databaseService.cancelOrder(orderid).subscribe((response)=>{ LoggerService.log("Order Canceled"); });
      this.databaseService.getKit(kitid).subscribe((kitData) => {
        var temp = JSON.parse(JSON.stringify(kitData));
        var stock = {stock: ++temp.stock};
        this.databaseService.updateKit(kitid, stock).subscribe((response) => {
          LoggerService.log("Stock Rollback Done");
          this.initialize();
        });
      });
    }

  }

  private makeViewStopLoading():void{
    this.loaderService.setUserLoader(false);
    if(!this.view){
      this.view=true;
    }
  }

  ngOnDestroy(){
    if(this.getTimeSubscription){
      this.getTimeSubscription.unsubscribe();
    }
    if(this.getUserSubscription){
      this.getUserSubscription.unsubscribe();
    }
    if(this.getOrderSubscription){
      this.getOrderSubscription.unsubscribe();
    }
    this.makeViewStopLoading();
  }

}
