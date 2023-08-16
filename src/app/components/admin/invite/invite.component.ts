import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule,ReactiveFormsModule]
})
export class InviteComponent {

  protected disableButton:boolean = environment.conditionFalse;

  constructor(private formBuilder:FormBuilder,private cryptographyService:CryptographyService,private databaseService:DatabaseService,private loaderService:LoaderService){}

  protected InviteForm:FormGroup<any> = this.formBuilder.group({
    name:[,[Validators.required]],
    email:[,[Validators.required,Validators.email,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]],
  },{validator:(formgroup:FormGroup)=>{
    var name = formgroup.controls['name'];
    var namex = (name.value+"").toLowerCase();
    if(!(namex=="") && namex.length<2){
      name.setErrors({nameLengthError:true});
    }else if(!(namex=="")){
      for(let i=0;i<namex.length;i++){
        if(!(97<=namex.charCodeAt(i) && namex.charCodeAt(i)<=122)){
          name.setErrors({nameAlphabetError:true});
          break;
        }
      }
    }
  }});

  protected addAdmin():void{
    this.disableButton = true;
    this.loaderService.setLoader(true);
    var name = this.InviteForm.controls['name'].value;
    var email = this.InviteForm.controls['email'].value.toLowerCase();

    if(this.InviteForm.invalid){
      alert("Invalid Data");
      LoggerService.error("Invalid Data error, Please enter valid data");
      this.disableButton = false;
      this.loaderService.setLoader(false);
    }else{
      var data = {
        name:name,
        email:email,
        password:this.cryptographyService.encryption("123*Axyz"),
        role:"admin",
        block:false
      }
      this.databaseService.getUser(email).subscribe((getdata)=>{
        if(getdata==null){
          this.databaseService.addUser(data).subscribe((adddata)=>{
            if(adddata!=null){
              alert("Admin Created\nName : "+name+"\nEmail : "+email+"\nPassword : 123*Axyz");
              LoggerService.info(`Admin Created Successfully : ${email}`);
            }else{
              LoggerService.error(`Error Occured in database.`);
            }
            this.disableButton = false;
            this.loaderService.setLoader(false);
          });
        }else{
          alert("Email already exists")
          this.disableButton = false;
          this.loaderService.setLoader(false);
        }
      })

    }
  }

}
