import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {

  public showpass = false;
  public disable_button = false;

  constructor(private router:Router,private builder:FormBuilder,private dbservice:DBService,private loader:LoaderService,private crypto:CryptographyService){

  }

  ForgotFormData = this.builder.group({
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

  public Togglepass(){
    this.showpass = !this.showpass;
  }


  public Update(){

    this.disable_button = true;
    this.loader.setLoader(true);

    var email = (this.ForgotFormData.controls['email'].value+"").toLowerCase();
    var password = this.ForgotFormData.controls['password'].value;
    var repassword = this.ForgotFormData.controls['repassword'].value;


    if(email==""||email==null||password==""||password==null||repassword==""||repassword==null||password!=repassword){
      alert("Invalid Data !");
      this.disable_button = false;
      this.loader.setLoader(false);
    }else{

      this.dbservice.GetUser(email).subscribe((data)=>{

        if(data==null){
          alert("No email found !");

          this.disable_button = false;
          this.loader.setLoader(false);

        }else{

          this.dbservice.UpdatePassword(email,this.crypto.encryption(password)).subscribe((datass)=>{

            alert("Password updated");

            this.router.navigate(['login'],{replaceUrl:true});
            this.disable_button = false;
            this.loader.setLoader(false);

          })

        }





      });

    }
  }


}
