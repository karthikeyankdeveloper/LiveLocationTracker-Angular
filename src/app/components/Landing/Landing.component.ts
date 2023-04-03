import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-Landing',
  templateUrl: './Landing.component.html',
  styleUrls: ['./Landing.component.css']
})
export class LandingComponent implements OnInit{

  constructor(public accessservice:AccessService){

  }

  ngOnInit(){

  }



}
