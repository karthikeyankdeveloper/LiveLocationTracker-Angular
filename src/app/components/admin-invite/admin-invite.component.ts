import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CryptographyService } from 'src/app/services/cryptography.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-admin-invite',
  templateUrl: './admin-invite.component.html',
  styleUrls: ['./admin-invite.component.css']
})
export class AdminInviteComponent {

  public disable_button = false;

  constructor(private builder:FormBuilder,private crypto:CryptographyService,private dbservice:DBService,private loader:LoaderService){

  }


  InviteForm = this.builder.group({
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


  public AddAdmin(){

    this.disable_button = true;
    this.loader.SetSampleLoader(true);

    var name = this.InviteForm.controls['name'].value;
    var email = this.InviteForm.controls['email'].value.toLowerCase();


    if(name==""||name==null||email==""||email==null){
      alert("Invalid Data");
      this.disable_button = false;
      this.loader.SetSampleLoader(false);
    }else{

      var data = {
        name:name,
        email:email,
        password:this.crypto.Encryption("123*Axyz"),
        role:"admin",
        block:false
      }

      this.dbservice.GetUser(email).subscribe((getdata)=>{
        if(getdata==null){

          this.dbservice.AddUser(data).subscribe((adddata)=>{

            if(adddata!=null){
              alert("Admin Created\nName : "+name+"\nEmail : "+email+"\nPassword : 123*Axyz");
            }else{
              alert("Error occured");
            }

            this.disable_button = false;
            this.loader.SetSampleLoader(false);

          });



        }else{
          alert("Email already exists")
          this.disable_button = false;
          this.loader.SetSampleLoader(false);
        }
      })

    }
  }

}
