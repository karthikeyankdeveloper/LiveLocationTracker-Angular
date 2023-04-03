import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public showpass:boolean = false;
  public disable_button:boolean = false;

  public Togglepass():void{
    this.showpass = !this.showpass;
  }

  constructor(private dbservice:DBService,public loaderservice:LoaderService,private forms:FormBuilder,private access_service:AccessService,private router:Router,private crypto:CryptographyService){

  }

  ngOnInit(){

  }

  LoginFormData = this.forms.group({
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:[,[Validators.required,Validators.minLength(8)]]
  });




  public email:any;
  public password:any;

  public AddLogin():void{

    this.disable_button = true;

    this.loaderservice.SetSampleLoader(true);

    this.email = (this.LoginFormData.controls['email'].value+"").toLowerCase();
    this.password = this.LoginFormData.controls['password'].value;

    if(this.email==null||this.email==""||this.password==null||this.password==""){
      alert("Enter all Field");
      this.disable_button = false;
      this.loaderservice.SetSampleLoader(false);
    }else{

      this.dbservice.GetUser(this.email).subscribe((adddata)=>{

        if(adddata==null){

          this.loaderservice.SetSampleLoader(false);
          this.disable_button = false;
          if(confirm("No user found!,please signup")){
            this.router.navigate(["signup"],{replaceUrl:true});
          }

        }else{

          let final_getdata = JSON.parse(JSON.stringify(adddata));

          if(final_getdata.block == true){

            alert("You are blocked");

          }else{

            if(this.crypto.Decryption(final_getdata.password)!=this.password){
              alert("Email or Password Incorrect");

            }else{

              this.access_service.LoadData(final_getdata);

              localStorage.setItem("llt-userdata",JSON.stringify(final_getdata));

              localStorage.setItem("llt-date",(new Date()).getDate()+"");

              this.router.navigate([''],{replaceUrl:true});

            }

          }

          this.disable_button = false;
          this.loaderservice.SetSampleLoader(false);
        }


      });

    }

  }

}
