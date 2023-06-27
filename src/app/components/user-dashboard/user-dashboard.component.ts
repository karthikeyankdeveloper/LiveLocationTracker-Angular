import { Component } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  public constructor(public accessService:AccessService){

  }

}
