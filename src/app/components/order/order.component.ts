import { Component, OnDestroy } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnDestroy {

  public Values: any;

  public all:any;
  public pending:any;
  public done:any;


  private httpsservide:any;

  public NoDataPrevent = false;

  constructor(private dbservice: DBService,private loader:LoaderService) {

    loader.SetSampleLoader(true);

    dbservice.GetAllOrder().subscribe((data) => {

      loader.SetSampleLoader(false);
      this.NoDataPrevent = true;

      this.all = this.KeyAddReverse(data);
      this.Values = this.all;

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
    })

  }


  private key = 0;
  public text = "All";

  public togglestatus(){
    this.key++;

    if(this.key==0){
      this.Values = this.all;
      this.text = "All";
    }else if(this.key==1){
      this.Values = this.pending;
      this.text = "Pending";
    }else if(this.key==2){
      this.Values = this.done;
      this.text = "Done";
      this.key = -1;
    }

  }


  private KeyAddReverse(datas:any) {
    var i = 0;
    var keys = Object.keys(datas);
    var values = Object.values(datas);
    var finaldata = [];

    for (let k of values) {
      var kk = JSON.parse(JSON.stringify(k));
      Object.assign(kk, { "orderid": keys[i++] });
      finaldata.push(kk);
    }

    return finaldata.reverse();

  }


  public View(ddd:any){
    console.log(ddd);
  }


  ngOnDestroy(): void {

    if(this.httpsservide){
      this.httpsservide.unsubscribe();
    }

  }
}
