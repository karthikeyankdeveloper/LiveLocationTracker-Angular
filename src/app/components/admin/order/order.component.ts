import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  standalone:true,
  imports:[RouterModule,CommonModule]
})
export class OrderComponent implements OnDestroy{

  protected finalTable: any;
  protected all:any;
  protected orderplaced:any;
  protected shipped:any;
  protected outfordelivery:any;
  protected delivered:any;
  protected cancelled:any;
  protected noDataPrevent:boolean = environment.conditionFalse;
  private getAllOrderSubscription:any;
  private getOrderSubscription:any;
  private key:number = 0;
  protected text:string = "All";
  protected viewModel:boolean = environment.conditionFalse;
  protected viewLoading:boolean = environment.conditionFalse;
  protected finalViewData:any;

  constructor(private databaseService: DatabaseService) {
    this.getAllOrder();
  }

  private getAllOrder():void{
    this.noDataPrevent = false;
    this.getAllOrderSubscription = this.databaseService.getAllOrder().subscribe((data) => {
      this.noDataPrevent = true;
      this.all = this.convertKeyAddReverse(data);
      let orderplaced_temp = [];
      let shipped_temp = [];
      let outfordelivery_temp = [];
      let delivered_temp = [];
      let cancelled_temp = [];
      for(let index of this.all){
        if(index.status=='Order Placed'){
          orderplaced_temp.push(index)
        }else if(index.status=='Shipped'){
          shipped_temp.push(index);
        }else if(index.status=='Out For Delivery'){
          outfordelivery_temp.push(index);
        }else if(index.status=='Delivered'){
          delivered_temp.push(index);
        }else{
          cancelled_temp.push(index);
        }
      }
      this.orderplaced = orderplaced_temp;
      this.shipped = shipped_temp;
      this.outfordelivery = outfordelivery_temp;
      this.delivered = delivered_temp;
      this.cancelled = cancelled_temp;
      this.toggleStatus(false);
    });
  }

  protected toggleStatus(condition:boolean):void{
    if(condition){
      this.key++;
      if(this.key>5){
        this.key = 0;
      }
    }

    if(this.key==0){
      this.finalTable = this.all;
      this.text = "All";
    }else if(this.key==1){
      this.finalTable = this.orderplaced;
      this.text = "Order Placed";
    }else if(this.key==2){
      this.finalTable = this.shipped;
      this.text = "Shipped";
    }else if(this.key==3){
      this.finalTable = this.outfordelivery;
      this.text = "Out For Delivery";
    }else if(this.key==4){
      this.finalTable = this.delivered;
      this.text = "Delivered";
    }else if(this.key==5){
      this.finalTable = this.cancelled;
      this.text = "Cancelled";
    }
  }

  private convertKeyAddReverse(datas:any):any[] {
    let index = 0;
    let keys = Object.keys(datas);
    let values = Object.values(datas);
    let finaldata = [];
    for (let data1 of values) {
      let temp = JSON.parse(JSON.stringify(data1));
      Object.assign(temp, { "orderid": keys[index++],"date":new Date(temp.timestamp) });
      finaldata.push(temp);
    }
    return finaldata.reverse();
  }
  // For sidebar
  protected falseView():void{
    this.viewModel = environment.conditionFalse;
  }

  protected View(key:any):void{
    this.viewModel = true;
    this.viewLoading = false;

    this.getOrderSubscription = this.databaseService.getOrder(key).subscribe((data)=>{
      setTimeout(()=>{
        this.viewLoading = true;
      },500);
      let temp = JSON.parse(JSON.stringify(data));
      Object.assign(temp,{"orderid":key,"date":new Date(temp.timestamp)});
      this.finalViewData = temp;
    });
  }

  protected toggleOrderStatus(key:string,condition:string):void{
    if(confirm("Confirm Your Action")){
      this.falseView();
      this.noDataPrevent = false;
      this.databaseService.toggleOrder(key,condition).subscribe((data)=>{
        this.getAllOrder();
        LoggerService.info(`${key} order status changed to ${condition}`);
      });
    }
  }

  ngOnDestroy(){
    if(this.getAllOrderSubscription){
      this.getAllOrderSubscription.unsubscribe();
    }
    if(this.getOrderSubscription){
      this.getOrderSubscription.unsubscribe();
    }
  }

}
