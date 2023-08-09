import { Component, OnInit,HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { Environment } from 'src/app/environment';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  protected screenwidth:any;
  protected headContent:boolean = Environment.conditionFalse;

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
      this.router.navigate([''],{replaceUrl:Environment.conditionTrue});
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
