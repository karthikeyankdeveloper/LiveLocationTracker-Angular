import { Component, OnInit,HostListener} from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-Header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.css']
})
export class HeaderComponent implements OnInit {

  public screenwidth:any;
  public head_content:boolean = false;


  public toggle(){
    this.head_content = !this.head_content;
  }

  constructor(public loaderservice:LoaderService,public access_service:AccessService,private router:Router){

  }


  ngOnInit(){
    this.onResize();
  }

  public Logout():void{
    if(confirm("Confirm Logout")){
      this.access_service.Logout();
      this.router.navigate([''],{replaceUrl:true});
    }

  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenwidth = window.innerWidth;

    if(this.screenwidth>=701 && !this.head_content){
      this.head_content=true;
    }

    if(this.screenwidth<=700 && this.head_content){
      this.head_content = false;
    }

  }

}
