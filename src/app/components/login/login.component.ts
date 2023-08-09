import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment';
import { AccessService } from 'src/app/services/access.service';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  protected showPassword:boolean = Environment.conditionFalse;
  protected disableButton:boolean = Environment.conditionFalse;

  constructor(private databaseService:DatabaseService,private loaderService:LoaderService,private formBuilder:FormBuilder,private accessService:AccessService,private router:Router,private cryptographyService:CryptographyService){}

  protected togglePassword():void{
    this.showPassword = !this.showPassword;
  }

  protected loginForm:FormGroup<any> = this.formBuilder.group({
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:[,[Validators.required,Validators.minLength(8)]]
  });

  protected addLogin():void{
    this.disableButton = true;
    this.loaderService.setLoader(true);

    let email = (this.loginForm.controls['email'].value+"").toLowerCase();
    let password = this.loginForm.controls['password'].value;

    if(this.loginForm.invalid){
      alert("Enter all Field");
      this.disableButton = false;
      this.loaderService.setLoader(false);
    }else{
      this.databaseService.getUser(email).subscribe((adddata)=>{
        if(adddata==null){
          this.loaderService.setLoader(false);
          this.disableButton = false;
          if(confirm("No user found!,please signup")){
            LoggerService.info(`No User Found this email ${email}, Please signup and try to login`);
            this.router.navigate(["signup"],{replaceUrl:true});
          }
        }else{
          let finalGetdata = JSON.parse(JSON.stringify(adddata));
          if(finalGetdata.block == true){
            alert("You are blocked");
            LoggerService.info(`Not able to login, this : ${email} user is blocked`);
          }else{
            if(this.cryptographyService.decryption(finalGetdata.password)==password){
              let stringifyData = {
                name:finalGetdata.name,
                email:finalGetdata.email,
                role:finalGetdata.role
              };
              this.accessService.loadData(stringifyData);
              localStorage.setItem("llt-userdata",JSON.stringify(stringifyData));
              localStorage.setItem("llt-date",(new Date()).getDate()+"");
              if(finalGetdata.role=="user"){
                this.router.navigate(['/user'],{replaceUrl:Environment.conditionTrue});
                LoggerService.info(`Logged in as User`);
              }else if(finalGetdata.role=="admin"){
                this.router.navigate(['/admin'],{replaceUrl:Environment.conditionTrue});
                LoggerService.info(`Logged in as Admin`);
              }else{
                this.router.navigate([''],{replaceUrl:Environment.conditionTrue});
                LoggerService.error(`Error occurred in Login, role not match`);
              }
            }else{
              alert("Email or Password Incorrect");
              LoggerService.info(`Login email or password incorrect`);
            }
          }
          this.disableButton = false;
          this.loaderService.setLoader(false);
        }


      });
    }

  }

}
