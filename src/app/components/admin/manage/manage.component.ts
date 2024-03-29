import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ManageComponent implements OnInit,OnDestroy{

  protected isuser:boolean = environment.conditionTrue;
  protected isactive:boolean = environment.conditionTrue;

  protected finalTable:any;
  protected activeUser:any;
  protected blockUser:any;
  protected activeAdmin:any;
  protected blockAdmin:any;

  protected noDataPrevent:boolean = environment.conditionFalse;
  private getAllUserDataSubscription:any;


  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe((querdata)=>{
      if(querdata.get('isuser')=="true" && querdata.get('isactive')=="true"){
        this.isuser = true;
        this.isactive = true;
      }
      else if(querdata.get('isuser')=="true" && querdata.get('isactive')=="false"){
        this.isuser = true;
        this.isactive = false;
      }
      else if(querdata.get('isuser')=="false" && querdata.get('isactive')=="false"){
        this.isuser = false;
        this.isactive = false;
      }
      else if(querdata.get('isuser')=="false" && querdata.get('isactive')=="true"){
        this.isuser = false;
        this.isactive = true;
      }
      this.fetchData();
    });
  }

  constructor(private activatedRoute:ActivatedRoute,private databaseService:DatabaseService){
    this.getAllUser();
  }

  private getAllUser():void{
    this.noDataPrevent = false;
    this.getAllUserDataSubscription = this.databaseService.getAllUserData().subscribe((data)=>{
      this.noDataPrevent = true;
      var activeuser = [];
      var blockuser = [];
      var activeadmin = [];
      var blockadmin = [];

      for(let valuess of Object.values(data)){
        if(valuess.role=="admin" && valuess.block==false && valuess.email!="2k19cse041@kiot.ac.in"){
          activeadmin.push(valuess);
        }
        else if(valuess.role=="admin" && valuess.block==true){
          blockadmin.push(valuess);
        }
        else if(valuess.role=="user" && valuess.block==false){
          activeuser.push(valuess);
        }
        else if(valuess.role=="user" && valuess.block==true){
          blockuser.push(valuess);
        }
      }

      this.activeAdmin = activeadmin;
      this.activeUser = activeuser;
      this.blockAdmin = blockadmin;
      this.blockUser = blockuser;

      this.fetchData();
    });

  }

  protected toggleUser():void{
    this.isuser = !this.isuser;
    this.fetchData();
  }

  protected toggleStatus():void{
    this.isactive = !this.isactive;
    this.fetchData();
  }

  private fetchData():void{
    if(this.isuser==true && this.isactive==true){
      this.finalTable = this.activeUser;
    }
    else if(this.isuser==true && this.isactive==false){
      this.finalTable = this.blockUser;
    }
    else if(this.isuser==false && this.isactive==true){
      this.finalTable = this.activeAdmin;
    }
    else if(this.isuser==false && this.isactive==false){
      this.finalTable = this.blockAdmin;
    }
  }

  protected block(email:any,booleancondition:any):void{
    if(confirm("Confirm Your Action")){
      this.noDataPrevent = false;
      this.databaseService.block(email,!booleancondition).subscribe((data)=>{
        LoggerService.info(`${email} user block status changed to ${!booleancondition}`);
        this.getAllUser();
      });
    }
  }

  ngOnDestroy(){
    if(this.getAllUserDataSubscription){
      this.getAllUserDataSubscription.unsubscribe();
    }
  }

}
