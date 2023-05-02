import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-Landing',
  templateUrl: './Landing.component.html',
  styleUrls: ['./Landing.component.css']
})
export class LandingComponent implements OnInit{

  constructor(private builder:FormBuilder,private roter:Router){

  }

  UidForm = this.builder.group({
    uid:[,Validators.required]
  })

  ngOnInit(){

  }

  public MapFetch(){
    var uid = this.UidForm.controls["uid"].value;
    if(uid==null||uid==""){
      alert("Invalid data");
    }else{
      this.roter.navigate(["/map"],{queryParams:{id:uid},replaceUrl:true});
    }
  }

}
