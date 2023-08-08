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

    this.loaderservice.setLoader(true);

    this.email = (this.LoginFormData.controls['email'].value+"").toLowerCase();
    this.password = this.LoginFormData.controls['password'].value;

    if(this.email==null||this.email==""||this.password==null||this.password==""){
      alert("Enter all Field");
      this.disable_button = false;
      this.loaderservice.setLoader(false);
    }else{

      this.dbservice.GetUser(this.email).subscribe((adddata)=>{

        if(adddata==null){

          this.loaderservice.setLoader(false);
          this.disable_button = false;
          if(confirm("No user found!,please signup")){
            this.router.navigate(["signup"],{replaceUrl:true});
          }

        }else{

          let final_getdata = JSON.parse(JSON.stringify(adddata));

          if(final_getdata.block == true){

            alert("You are blocked");

          }else{

            if(this.crypto.decryption(final_getdata.password)==this.password){

              var stringify_data = {
                name:final_getdata.name,
                email:final_getdata.email,
                role:final_getdata.role
              };

              this.access_service.loadData(stringify_data);

              localStorage.setItem("llt-userdata",JSON.stringify(stringify_data));

              localStorage.setItem("llt-date",(new Date()).getDate()+"");

              if(final_getdata.role=="user"){
                this.router.navigate(['/user'],{replaceUrl:true});
              }else if(final_getdata.role=="admin"){
                this.router.navigate(['/admin'],{replaceUrl:true});
              }else{
                this.router.navigate([''],{replaceUrl:true});
              }


            }else{
              alert("Email or Password Incorrect");
            }

          }

          this.disable_button = false;
          this.loaderservice.setLoader(false);
        }


      });

    }

  }

}
