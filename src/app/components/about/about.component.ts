import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UpdateService } from 'src/app/services/update.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class AboutComponent {

  constructor(private updateService:UpdateService){
    updateService.checkForUpdate().then((data)=>{
      console.log("Check",data);
    });
  }

}
