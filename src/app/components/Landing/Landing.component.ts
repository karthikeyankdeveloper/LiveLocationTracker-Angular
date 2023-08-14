import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Landing',
  templateUrl: './Landing.component.html',
  styleUrls: ['./Landing.component.css']
})
export class LandingComponent{

  constructor(private formBuilder:FormBuilder,private router:Router){}

  protected uidForm:FormGroup<any> = this.formBuilder.group({
    uid:[,Validators.required]
  });

  protected mapFetch():void{
    let uid = this.uidForm.controls["uid"].value;
    if(uid==null||uid==""){
      alert("Invalid data");
      LoggerService.warn("Invalid data from UID input field");
    }else{
      this.router.navigate(["/map"],{queryParams:{id:uid},replaceUrl:environment.conditionTrue});
    }
  }

}
