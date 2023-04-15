import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit,OnDestroy{

  public isuser = true;
  public isactive = true;


  public FinalTable:any;
  public ActiveUser:any;
  public BlockUser:any;
  public ActiveAdmin:any;
  public BlockAdmin:any;

  public NoDataPrevent = false;


  ngOnInit(){
    this.routes.queryParamMap.subscribe((querdata)=>{

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

      this.FetchData();

    });
  }


  constructor(private routes:ActivatedRoute,private dbService:DBService){

    this.GetAllUser();

  }


  private GetAllUser(){

    this.NoDataPrevent = false;

    this.dbService.GetAllUserData().subscribe((data)=>{

      this.NoDataPrevent = true;

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

      this.ActiveAdmin = activeadmin;
      this.ActiveUser = activeuser;
      this.BlockAdmin = blockadmin;
      this.BlockUser = blockuser;

      this.FetchData();

    });

  }



  public ToggleUser(){
    this.isuser = !this.isuser;
    this.FetchData();
  }


  public ToggleStatus(){
    this.isactive = !this.isactive;
    this.FetchData();
  }


  private FetchData(){
    if(this.isuser==true && this.isactive==true){
      this.FinalTable = this.ActiveUser;
    }
    else if(this.isuser==true && this.isactive==false){
      this.FinalTable = this.BlockUser;
    }
    else if(this.isuser==false && this.isactive==true){
      this.FinalTable = this.ActiveAdmin;
    }
    else if(this.isuser==false && this.isactive==false){
      this.FinalTable = this.BlockAdmin;
    }
  }



  public Block(email:any,booleancondition:any){

    if(confirm("Confirm Your Action")){
      this.NoDataPrevent = false;
      this.dbService.Block(email,!booleancondition).subscribe((data)=>{
        this.GetAllUser();
      });
    }
  }

  ngOnDestroy(): void {

  }


}
