import { Component, OnDestroy } from '@angular/core';
import { Environment } from 'src/app/environment';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-buy',
  templateUrl: './user-buy.component.html',
  styleUrls: ['./user-buy.component.css']
})
export class UserBuyComponent implements OnDestroy {

  protected view:boolean = Environment.conditionFalse;
  protected buyDataList:any;
  private getAllKitSubscription:any;

  constructor(private loaderService:LoaderService,private databaseService:DatabaseService){
    this.loaderService.setUserLoader(true);
    this.getAllKitSubscription = this.databaseService.GetAllKit().subscribe((data)=>{
      if(data!=null){
        let buyData = [];
        for(let temp of Object.values(data)){
          if(temp?.stock>10){
            buyData.push(temp);
          }
        }
        this.buyDataList = buyData.reverse();
      }
      this.makeViewStopLoading();
    });
  }

  private makeViewStopLoading():void{
    this.loaderService.setUserLoader(false);
    if(!this.view){
      this.view=true;
    }
  }

  ngOnDestroy(){
    if(this.getAllKitSubscription){
      this.getAllKitSubscription.unsubscribe();
    }
    this.makeViewStopLoading();
  }

}
