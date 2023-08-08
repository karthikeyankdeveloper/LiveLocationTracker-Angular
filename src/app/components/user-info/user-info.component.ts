import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent{

  private getUserSubscription:any;
  private updateProfileSubscription:any;

  protected UserData:any;
  protected view:boolean = false;

  public constructor(public accessService:AccessService,private dbService:DBService,private loderService:LoaderService,private  builder:FormBuilder){
    loderService.setUserLoader(true);

    this.getUserSubscription = dbService.GetUser(accessService.getEmail()).subscribe((data)=>{
      var datas = JSON.parse(JSON.stringify(data));
      Object.assign(datas,{"time":new Date(datas.timestamp)});
      this.UserData = datas;

      this.PersonalInfo.controls["name"].setValue(this.UserData?.name);
      this.PersonalInfo.controls["phone"].setValue(this.UserData?.phone);
      this.PersonalInfo.controls["address"].setValue(this.UserData?.address);
      this.PersonalInfo.controls["pincode"].setValue(this.UserData?.pincode);

      this.makeViewStopLoading();
    });

  }

  protected PersonalInfo = this.builder.group({
    name:[,[Validators.required,Validators.pattern('^(?!.*([A-Za-z])\\1{3})[A-Za-z]{2,16}$')]],
    phone:[,[Validators.required,Validators.pattern('^[0-9]{10}$')]],
    address:[,[Validators.required,Validators.pattern("[a-zA-Z0-9.'# @%&/,-]{5,}.*")]],
    pincode:[,[Validators.required,Validators.pattern("[0-9]{6}")]]
  });


  protected Update(){
    this.loderService.setUserLoader(true);
    this.updateProfileSubscription = this.dbService.UpdateProfile(this.accessService.getEmail(),this.PersonalInfo.value).subscribe((dd)=>{
      this.makeViewStopLoading();
      alert("Update Success");
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
