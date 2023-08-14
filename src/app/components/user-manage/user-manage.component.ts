import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccessService } from 'src/app/services/access.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent {

  protected view:boolean = environment.conditionFalse;
  protected passwordView:boolean = environment.conditionFalse;
  protected deviceData:any;
  private tempId:any;
  private getUserSubscription:any;

  constructor(private loaderService:LoaderService,private databaseService:DatabaseService,private accessService:AccessService,private formBuilder:FormBuilder){
    this.initialize();
  }

  protected passwordForm:FormGroup<any> = this.formBuilder.group({
    password:[,[Validators.required,Validators.pattern("^.{6}$")]]
  });

  private initialize():void{
    this.loaderService.setUserLoader(true);
    this.getUserSubscription = this.databaseService.getUser(this.accessService.getEmail()).subscribe((user_response)=>{
      var userResponseJson = JSON.parse(JSON.stringify(user_response));
      if(userResponseJson?.device!=null){
        let finalData:any = [];
        for(let device of Object.values(userResponseJson.device)){
          this.databaseService.mapFetch(device).subscribe((response)=>{
            finalData.push(response);
          });
        }

        setTimeout(()=>{
          for (let index = 0; index < finalData.length; index++) {
            for (let subindex = index + 1; subindex < finalData.length; subindex++) {
              if (finalData[index].forascending < finalData[subindex].forascending) {
                const temp = finalData[index];
                finalData[index] = finalData[subindex];
                finalData[subindex] = temp;
              }
            }
          }
          this.deviceData = finalData;
          this.makeViewStopLoading();
        },1500);

      }else{
        this.makeViewStopLoading();
      }
    });
  }

  protected updatePassword():void{
    if(this.passwordForm.valid){
      this.togglePasswordView();
      this.loaderService.setUserLoader(true);
      let password = this.passwordForm.controls['password'].value;
      const data = {password : password};
      this.databaseService.updateRemote(this.tempId,data).subscribe((response)=>{
        LoggerService.info('Device Password updated');
        this.initialize();
      });
    }else{
      alert("Password Length should be 6");
    }
  }

  protected disable(uid:any):void{
    this.loaderService.setUserLoader(true);
    var data = {enable:false};
    this.databaseService.updateRemote(uid,data).subscribe((response)=>{
      this.initialize();
      LoggerService.info("Device disabled");
    });
  }

  protected enable(uid:any):void{
    this.loaderService.setUserLoader(true);
    var data = {enable:true};
    this.databaseService.updateRemote(uid,data).subscribe((response)=>{
      this.initialize();
      LoggerService.info("Device enabled");
    });
  }

  protected changePass(uid:any):void{
    this.tempId = uid;
    this.togglePasswordView();
  }

  private makeViewStopLoading(): void {
    this.loaderService.setUserLoader(false);
    if (!this.view) {
      this.view = true;
    }
  }

  protected togglePasswordView():void{
    this.passwordView = !this.passwordView;
  }

  ngOnDestroy(){
    this.makeViewStopLoading();
    if(this.getUserSubscription){
      this.getUserSubscription.unsubscribe();
    }
  }

}
