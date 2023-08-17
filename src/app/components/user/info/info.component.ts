import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule]
})
export class InfoComponent implements OnDestroy{

  private getUserSubscription:any;
  private updateProfileSubscription:any;
  protected userData:any;
  protected view:boolean = environment.conditionFalse;

  constructor(private accessService:AccessService,private databaseService:DatabaseService,private loderService:LoaderService,private formBuilder:FormBuilder){
    this.loderService.setUserLoader(true);
    this.getUserSubscription = databaseService.getUser(this.accessService.getEmail()).subscribe((data)=>{
      var jsonData = JSON.parse(JSON.stringify(data));
      Object.assign(jsonData,{"time":new Date(jsonData.timestamp)});
      this.userData = jsonData;
      this.personalInfo.controls["name"].setValue(this.userData?.name);
      this.personalInfo.controls["phone"].setValue(this.userData?.phone);
      this.personalInfo.controls["address"].setValue(this.userData?.address);
      this.personalInfo.controls["pincode"].setValue(this.userData?.pincode);
      this.makeViewStopLoading();
    });
  }

  protected personalInfo:FormGroup<any> = this.formBuilder.group({
    name:[,[Validators.required,Validators.pattern('^(?!.*([A-Za-z])\\1{3})[A-Za-z]{2,16}$')]],
    phone:[,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    address:[,[Validators.required,Validators.pattern("[a-zA-Z0-9.'# @%&/,-]{5,}.*")]],
    pincode:[,[Validators.required,Validators.pattern("[0-9]{6}")]]
  });

  protected update():void{
    this.loderService.setUserLoader(true);
    this.updateProfileSubscription = this.databaseService.updateProfile(this.accessService.getEmail(),this.personalInfo.value).subscribe((dd)=>{
      this.makeViewStopLoading();
      alert("Update Success");
      LoggerService.info("Personal info updated");
    });
  }

  private makeViewStopLoading():void{
    this.loderService.setUserLoader(false);
    if(!this.view){
      this.view=true;
    }
  }

  ngOnDestroy(){
    if(this.getUserSubscription){
      this.getUserSubscription.unsubscribe();
    }
    if(this.updateProfileSubscription){
      this.updateProfileSubscription.unsubscribe();
    }
    this.makeViewStopLoading();
  }

}
