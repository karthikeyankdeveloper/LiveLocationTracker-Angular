import { Component } from '@angular/core';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-buy',
  templateUrl: './user-buy.component.html',
  styleUrls: ['./user-buy.component.css']
})
export class UserBuyComponent {

  protected View:boolean = false;
  protected BuyDataList:any;

  private getAllKitSubscription:any;

  constructor(private loaderService:LoaderService,private dbService:DBService){
    this.loaderService.setUserLoader(true);

    this.getAllKitSubscription = dbService.GetAllKit().subscribe((data)=>{
      if(data!=null){
        var buydata = [];
        for(let temp of Object.values(data)){
          if(temp?.stock>10){
            buydata.push(temp);
          }
        }
        this.BuyDataList = buydata.reverse();
      }
      this.makeViewStopLoading();
    });
  }


  private makeViewStopLoading():void{
    this.loaderService.setUserLoader(false);
    if(!this.View){
      this.View=true;
    }
  }

  ngOnDestroy(){
    if(this.getAllKitSubscription){
      this.getAllKitSubscription.unsubscribe();
    }
    this.makeViewStopLoading();
  }

}
