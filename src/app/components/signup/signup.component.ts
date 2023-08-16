import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { confirmValidator } from 'src/app/confirm.validator';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule]
})
export class SignupComponent{

  protected showPassword:boolean = environment.conditionFalse;
  protected disableButton:boolean = environment.conditionFalse;

  constructor (private loaderService:LoaderService, private formBuilder:FormBuilder, private databaseService:DatabaseService, private router:Router, private cryptographyService:CryptographyService){}

  protected togglePassword():void{
    this.showPassword=!this.showPassword;
  }

  protected signupForm:FormGroup<any> = this.formBuilder.group({
    name:[,[Validators.required,Validators.pattern('^(?!.*([A-Za-z])\\1{3})[A-Za-z]{2,16}$')]],
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:[,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]],
    repassword:[,[Validators.required]]
  },{validator:confirmValidator('name','password','repassword')});

  protected addUser():void{
    this.disableButton = true;
    this.loaderService.setLoader(true);

    let name = this.signupForm.controls['name'].value;
    let email = (this.signupForm.controls['email'].value+"").toLowerCase();
    let password = this.signupForm.controls['password'].value;

    if(this.signupForm.invalid){
      alert("Wrong Data,Please fill all Field");
      LoggerService.info('Invalid data from signup feild');
      this.disableButton = false;
      this.loaderService.setLoader(false);
    }else{
      let data = {
        name:name,
        email:email,
        password: this.cryptographyService.encryption(password),
        role:"user",
        block:false,
        timestamp:{
          ".sv":"timestamp"
        }
      }

      this.databaseService.getUser(email).subscribe((getdata)=>{
        if(getdata==null){
          this.databaseService.addUser(data).subscribe((adddata)=>{
            this.disableButton = false;
            this.loaderService.setLoader(false);
            if(adddata!=null){
              alert("Register success");
              LoggerService.info("Signup Success");
              this.router.navigate(['login'],{replaceUrl:environment.conditionTrue})
            }else{
              LoggerService.error("Error creating account,Try again");
              alert("Error creating account,Try again");
            }
          });
        }else{
          LoggerService.info("Account Already exists, Please Login");
          if(confirm("Account Already exists! Please Login")){
            this.router.navigate(['login'],{replaceUrl:environment.conditionTrue});
          }
          this.disableButton = false;
          this.loaderService.setLoader(false);
        }
      });

    }

  }

}
