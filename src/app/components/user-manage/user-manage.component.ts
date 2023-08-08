import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent {
  protected View = false;
  protected passView = false;
  protected DeviceData:any;
  protected TempId:any;

  constructor(private loaderService:LoaderService,private dbService:DBService,private accessService:AccessService,private builder:FormBuilder){
    this.Initialize();
  }

  protected passwordForm = this.builder.group({
    password:[,[Validators.required,Validators.pattern("^.{6}$")]]
  });

  private Initialize():void{
    this.loaderService.setUserLoader(true);
    this.dbService.GetUser(this.accessService.getEmail()).subscribe((user_response)=>{
      var user_response_json = JSON.parse(JSON.stringify(user_response));
      if(user_response_json?.device!=null){
        var final_data:any = [];
        for(let device of Object.values(user_response_json.device)){
          this.dbService.MapFetch(device).subscribe((response)=>{
            final_data.push(response);
          });
        }

        setTimeout(()=>{
          for (let i = 0; i < final_data.length; i++) {
            for (let j = i + 1; j < final_data.length; j++) {
              if (final_data[i].forascending < final_data[j].forascending) {
                var temp = final_data[i];
                final_data[i] = final_data[j];
                final_data[j] = temp;
              }
            }
          }
          this.DeviceData = final_data;
          this.makeViewStopLoading();
        },1500);

      }else{
        this.makeViewStopLoading();
      }
    });
  }

  protected UpdatePassword(){
    if(this.passwordForm.valid){
      this.TogglePass();
      this.loaderService.setUserLoader(true);
      var password = this.passwordForm.controls['password'].value;
      var data = {
        password : password
      }
      this.dbService.UpdateRemote(this.TempId,data).subscribe((response)=>{
        this.Initialize();
      });

    }else{
      alert("Password Length should be 6");
    }


  }

  protected disable(uid:any){
    this.loaderService.setUserLoader(true);
    var data = {
      enable:false
    }
    this.dbService.UpdateRemote(uid,data).subscribe((response)=>{
      this.Initialize();
    });
  }
  protected enable(uid:any){
    this.loaderService.setUserLoader(true);
    var data = {
      enable:true
    }
    this.dbService.UpdateRemote(uid,data).subscribe((response)=>{
      this.Initialize();
    });
  }

  protected ChangePass(uid:any){
    this.TempId = uid;
    this.TogglePass();
  }

  private makeViewStopLoading(): void {
    this.loaderService.setUserLoader(false);
    if (!this.View) {
      this.View = true;
    }
  }

  protected TogglePass(){
    this.passView = !this.passView;
  }

  ngOnDestroy(){
    this.makeViewStopLoading();
  }

}
