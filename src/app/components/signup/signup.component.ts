import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmValidator } from 'src/app/confirm.validator';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  public showpass = false;
  public disable_button = false;

  public Togglepass():void{
    this.showpass=!this.showpass;
  }

  constructor (public loaderservice:LoaderService,private forms:FormBuilder,private dbservice:DBService,private router:Router,private crypto:CryptographyService){

  }


  ngOnInit(): void {


  }

  SignupFormData = this.forms.group({
    name:[,[Validators.required]],
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
    password:[,[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/)]],
    repassword:[,[Validators.required]]
  },{validator:confirmValidator('name','password','repassword')});


  public name:any;
  public email:any;
  public password:any;
  public repassword:any;

  public AddUser():void{
    this.disable_button = true;
    this.loaderservice.SetSampleLoader(true);

    this.name = this.SignupFormData.controls['name'].value;
    this.email = (this.SignupFormData.controls['email'].value+"").toLowerCase();
    this.password = this.SignupFormData.controls['password'].value;
    this.repassword = this.SignupFormData.controls['repassword'].value;

    if(this.name==null||this.name==""||this.email==null||this.email==""||this.password==null||this.password==""||this.repassword==null||this.repassword==""){
      alert("Wrong Data,Please fill all Field");
      this.disable_button = false;
      this.loaderservice.SetSampleLoader(false);
    }else{

      var data = {
        name:this.name,
        email:this.email,
        password: this.crypto.Encryption(this.password),
        role:"user",
        block:false
      }

      this.dbservice.GetUser(this.email).subscribe((getdata)=>{
        if(getdata==null){
          this.dbservice.AddUser(data).subscribe((adddata)=>{
            this.disable_button = false;
            this.loaderservice.SetSampleLoader(false);
            if(adddata!=null){
              alert("Register success");
              this.router.navigate(['login'],{replaceUrl:true})
            }else{
              alert("Error creating account,Try again");
            }
          });
        }else{
          if(confirm("Account Already exists! Please Login")){
            this.router.navigate(['login'],{replaceUrl:true});
          }
          this.disable_button = false;
          this.loaderservice.SetSampleLoader(false);
        }
      });

    }

  }




}
