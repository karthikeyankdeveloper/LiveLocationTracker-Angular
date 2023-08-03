import { Component } from '@angular/core';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {

  public FinalTable: any;

  public all:any;

  public orderplaced:any;
  public shipped:any;
  public outfordelivery:any;
  public delivered:any;
  public cancelled:any;


  public NoDataPrevent = false;

  constructor(private dbservice: DBService) {

    this.GetAllOrder();

  }

  public GetAllOrder(){

    this.NoDataPrevent = false;


    this.dbservice.GetAllOrder().subscribe((data) => {

      this.NoDataPrevent = true;

      this.all = this.KeyAddReverse(data);

      var orderplaced_temp = [];
      var shipped_temp = [];
      var outfordelivery_temp = [];
      var delivered_temp = [];
      var cancelled_temp = [];

      for(let j of this.all){
        if(j.status=='Order Placed'){
          orderplaced_temp.push(j)
        }else if(j.status=='Shipped'){
          shipped_temp.push(j);
        }else if(j.status=='Out For Delivery'){
          outfordelivery_temp.push(j);
        }else if(j.status=='Delivered'){
          delivered_temp.push(j);
        }else{
          cancelled_temp.push(j);
        }
      }

      this.orderplaced = orderplaced_temp;
      this.shipped = shipped_temp;
      this.outfordelivery = outfordelivery_temp;
      this.delivered = delivered_temp;
      this.cancelled = cancelled_temp;

      this.togglestatus(false);
    });

  }


  private key = 0;
  public text = "All";

  public togglestatus(condition:boolean){

    if(condition){
      this.key++;
      if(this.key>5){
        this.key = 0;
      }
    }

    if(this.key==0){
      this.FinalTable = this.all;
      this.text = "All";
    }else if(this.key==1){
      this.FinalTable = this.orderplaced;
      this.text = "Order Placed";
    }else if(this.key==2){
      this.FinalTable = this.shipped;
      this.text = "Shipped";
    }else if(this.key==3){
      this.FinalTable = this.outfordelivery;
      this.text = "Out For Delivery";
    }else if(this.key==4){
      this.FinalTable = this.delivered;
      this.text = "Delivered";
    }else if(this.key==5){
      this.FinalTable = this.cancelled;
      this.text = "Cancelled";
    }

  }


  private KeyAddReverse(datas:any) {
    var i = 0;
    var keys = Object.keys(datas);
    var values = Object.values(datas);
    var finaldata = [];

    for (let k of values) {
      var kk = JSON.parse(JSON.stringify(k));

      var date = new Date(kk.timestamp);

      Object.assign(kk, { "orderid": keys[i++],"date":date });
      finaldata.push(kk);
    }

    return finaldata.reverse();

  }


  // For sidebar

  public viewmodel = false;
  public viewloading = false;
  public FinalViewData:any;


  public Falseview(){
    this.viewmodel = false;
  }


  public View(key:any){

    this.viewmodel = true;

    this.viewloading = false;

    this.dbservice.GetOrder(key).subscribe((data)=>{

      setTimeout(()=>{
        this.viewloading = true;
      },500);


      var temp = JSON.parse(JSON.stringify(data));
      var date = new Date(temp.timestamp);
      Object.assign(temp,{"orderid":key,"date":date});

      this.FinalViewData = temp;
    });

  }


  public ToggleOrderStatus(key:string,condition:string){

    if(confirm("Confirm Your Action")){

      this.Falseview();
      this.NoDataPrevent = false;

      this.dbservice.ToggleOrder(key,condition).subscribe((data)=>{
        this.GetAllOrder();
      });

    }

  }

}
