import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  protected showPassword:boolean = Environment.conditionFalse;
  protected disableButton:boolean = Environment.conditionFalse;

  constructor(private router:Router,private formBuilder:FormBuilder,private databaseService:DatabaseService,private loaderService:LoaderService,private cryptographyService:CryptographyService){}

  protected forgotForm = this.formBuilder.group({
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:[,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]],
    repassword:[,[Validators.required]]
  },{validator:(formgroup:FormGroup)=>{
    var pass = formgroup.controls['password'];
    var repass = formgroup.controls['repassword'];
    if(pass.value!==repass.value){
      repass.setErrors({passwordmatcher:true});
    }else{
      repass.setErrors(null);
    }
  }});

  protected togglePassword():void{
    this.showPassword = !this.showPassword;
  }

  protected update():void{
    this.disableButton = true;
    this.loaderService.setLoader(true);
    let email = (this.forgotForm.controls['email'].value+"").toLowerCase();
    let password = this.forgotForm.controls['password'].value;
    if(this.forgotForm.invalid){
      alert("Invalid Data !");
      LoggerService.warn("Invalid data from forgot feild");
      this.disableButton = false;
      this.loaderService.setLoader(false);
    }else{
      this.databaseService.getUser(email).subscribe((data)=>{
        if(data==null){
          alert("No email found !");
          LoggerService.info(`No email found ${email}`);
          this.disableButton = false;
          this.loaderService.setLoader(false);
        }else{
          this.databaseService.updatePassword(email,this.cryptographyService.encryption(password)).subscribe((response)=>{
            alert("Password updated");
            LoggerService.info(`Password updated for this email : ${email}`);
            this.router.navigate(['login'],{replaceUrl:true});
            this.disableButton = false;
            this.loaderService.setLoader(false);
          })
        }
      });
    }
  }
}
