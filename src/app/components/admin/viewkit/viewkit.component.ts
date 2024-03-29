import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-viewkit',
  templateUrl: './viewkit.component.html',
  styleUrls: ['./viewkit.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule]
})
export class ViewkitComponent implements OnInit,OnDestroy{

  private kitId:any;
  protected finalData:any;
  protected preventLoading:boolean=environment.conditionFalse;
  private getKitSubscription:any;

  constructor(private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,private router:Router,private databaseService:DatabaseService){}

  protected updateForm:FormGroup<any> = this.formBuilder.group({
    name:[],
    desc:[],
    img:[],
    actualprice:[],
    discountprice:[],
    stock:[]
  });

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((query)=>{
      this.kitId = query.get('id');
      if(this.kitId==null||this.kitId==''){
        this.router.navigate(['admin/kit'],{replaceUrl:true});
      }else{
        this.getKit(this.kitId);
      }
    });
  }

  private getKit(id:any):any{
    this.preventLoading = false;
    this.getKitSubscription = this.databaseService.getKit(id).subscribe((data)=>{
      if(data==null){
        alert("No data Found!");
        this.router.navigate(['admin/kit'],{replaceUrl:true});
      }else{
        this.preventLoading = true;
        this.finalData = data;
        this.updateForm.controls["name"].setValue(this.finalData.name);
        this.updateForm.controls["desc"].setValue(this.finalData.desc);
        this.updateForm.controls["img"].setValue(this.finalData.img);
        this.updateForm.controls["actualprice"].setValue(this.finalData.actualprice);
        this.updateForm.controls["discountprice"].setValue(this.finalData.discountprice);
        this.updateForm.controls["stock"].setValue(this.finalData.stock);
      }
    });
  }

  protected updateKit():void{
    if(this.updateForm.invalid){
      alert("Invalid data");
      LoggerService.error("Invalid data from input");
    }else{
      var datas = this.updateForm.value;
      this.preventLoading = false;
      this.databaseService.updateKit(this.kitId,datas).subscribe((response)=>{
        LoggerService.info("Kit details Updated");
        this.getKit(this.kitId);
      });
    }
  }

  protected deleteKit():void{
    if(confirm("Confirm Delete")){
      this.preventLoading=false;
      this.databaseService.deleteKit(this.kitId).subscribe((data)=>{
        alert("Deleted Successfully");
        LoggerService.info("Kit deleted successfully");
        this.router.navigate(['admin/kit'],{replaceUrl:environment.conditionTrue});
      });
    }
  }

  ngOnDestroy(){
    if(this.getKitSubscription){
      this.getKitSubscription.unsubscribe();
    }
  }

}
