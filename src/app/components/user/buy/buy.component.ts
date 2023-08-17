import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class BuyComponent implements OnDestroy{
  protected view:boolean = environment.conditionFalse;
  protected buyDataList:any;
  private getAllKitSubscription:any;

  constructor(private loaderService:LoaderService,private databaseService:DatabaseService){
    this.loaderService.setUserLoader(true);
    this.getAllKitSubscription = this.databaseService.getAllKit().subscribe((data)=>{
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
