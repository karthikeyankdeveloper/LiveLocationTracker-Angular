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
  public pending:any;
  public done:any;


  public NoDataPrevent = false;

  constructor(private dbservice: DBService) {

    this.GetAllOrder();

  }

  public GetAllOrder(){

    this.NoDataPrevent = false;


    this.dbservice.GetAllOrder().subscribe((data) => {

      this.NoDataPrevent = true;

      this.all = this.KeyAddReverse(data);

      var pending_temp = [];
      var done_temp = [];

      for(let j of this.all){
        if(j.status){
          done_temp.push(j)
        }else{
          pending_temp.push(j);
        }
      }

      this.pending = pending_temp;
      this.done = done_temp;

      this.togglestatus(false);
    });

  }


  private key = 0;
  public text = "All";

  public togglestatus(condition:boolean){

    if(condition){
      this.key++;
      if(this.key>2){
        this.key = 0;
      }
    }

    if(this.key==0){
      this.FinalTable = this.all;
      this.text = "All";
    }else if(this.key==1){
      this.FinalTable = this.pending;
      this.text = "Pending";
    }else if(this.key==2){
      this.FinalTable = this.done;
      this.text = "Done";
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


  public ToggleOrderStatus(key:string,condition:boolean){

    if(confirm("Confirm Your Action")){

      this.Falseview();
      this.NoDataPrevent = false;

      this.dbservice.ToggleOrder(key,!condition).subscribe((data)=>{
        this.GetAllOrder();
      });

    }

  }

}
