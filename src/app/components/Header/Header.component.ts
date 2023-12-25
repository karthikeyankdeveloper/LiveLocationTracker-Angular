import { CommonModule } from '@angular/common';
import { Component, OnInit,HostListener} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css'],
  // standalone:true,
  // imports:[CommonModule,RouterModule]
})
export class HeaderComponent implements OnInit {

  protected screenwidth:any;
  protected headContent:boolean = environment.conditionFalse;

  constructor(protected loaderService:LoaderService,protected accessService:AccessService,private router:Router){}

  ngOnInit(){
    this.onResize();
  }

  protected toggle():void{
    this.headContent = !this.headContent;
  }

  protected logout():void{
    if(confirm("Confirm Logout")){
      this.accessService.logout();
      this.router.navigate([''],{replaceUrl:environment.conditionTrue});
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenwidth = window.innerWidth;
    if(this.screenwidth>=701 && !this.headContent){
      this.headContent=true;
    }
    if(this.screenwidth<=700 && this.headContent){
      this.headContent = false;
    }
  }

}
