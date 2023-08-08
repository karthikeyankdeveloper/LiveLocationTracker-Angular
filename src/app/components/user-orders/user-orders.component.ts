import { Component } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {

  protected View = false;
  protected FinalOrderdata:any;
  private serverTime:any;
  private getTimeSubscription:any;
  private getUserSubscription:any;
  private getOrderSubscription:any;

  constructor(private loaderService:LoaderService,private dbService:DBService,private accessService:AccessService){
    this.Initialize();
  }

  private Initialize(){
    this.loaderService.SetUserLoading(true);

    this.getTimeSubscription = this.dbService.getTimestamp().subscribe((response_time)=>{
      this.serverTime = response_time;

      this.getUserSubscription = this.dbService.GetUser(this.accessService.GetEmail()).subscribe((user_data)=>{
        var user_data_json = JSON.parse(JSON.stringify(user_data));

        if(user_data_json?.order!=null){
          var final_order_data:any = [];
          for(let values of Object.values(user_data_json.order)){
            this.getOrderSubscription = this.dbService.GetOrder(values+"").subscribe((response)=>{
              var response_modified = JSON.parse(JSON.stringify(response));
              const diffrence_time_Ms = this.serverTime-response_modified.timestamp;
              const twenty_four_fours_Ms = 24 * 60 * 60 * 1000;
              Object.assign(response_modified,{orderid:values,date:new Date(response_modified.timestamp),cancel:diffrence_time_Ms<=twenty_four_fours_Ms});
              final_order_data.push(response_modified);
            });
          }

          setTimeout(()=>{
            for (let i = 0; i < final_order_data.length; i++) {
              for (let j = i + 1; j < final_order_data.length; j++) {
                if (final_order_data[i].timestamp < final_order_data[j].timestamp) {
                  var temp = final_order_data[i];
                  final_order_data[i] = final_order_data[j];
                  final_order_data[j] = temp;
                }
              }
            }
            this.FinalOrderdata = final_order_data;
            this.makeViewStopLoading();
          },1500);
        }else{
          this.makeViewStopLoading();
        }

      });
    });

  }

  protected cancelOrder(uid:any,orderid:any,kitid:any){
    if(confirm("Confirm Cancellation")){
      this.loaderService.SetUserLoading(true);

      this.dbService.DeleteUserDevice(this.accessService.GetEmail(),uid).subscribe((response)=>{});
      this.dbService.DeleteRemote(uid).subscribe((response)=>{});
      this.dbService.CancelOrder(orderid).subscribe((response)=>{});

      this.dbService.GetKit(kitid).subscribe((kit_data) => {
        var temp = JSON.parse(JSON.stringify(kit_data));
        var stock = {
          stock: ++temp.stock
        }
        this.dbService.UpdateKit(kitid, stock).subscribe((response) => {
          this.Initialize();
        });
      });
    }

  }

  private makeViewStopLoading():void{
    this.loaderService.SetUserLoading(false);
    if(!this.View){
      this.View=true;
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
