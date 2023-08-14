import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-NotFound',
  templateUrl: './NotFound.component.html',
  styleUrls: ['./NotFound.component.css'],
  standalone:true,
  imports:[CommonModule,RouterModule]
})
export class NotFoundComponent {

}
