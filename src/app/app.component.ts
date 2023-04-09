import { Component, HostListener } from '@angular/core';
import { AccessService } from './services/access.service';
import { DBService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isupdate:any = true;

  constructor(private db:DBService,private access_service:AccessService){
    db.DBcheck().subscribe((data)=>{
      this.isupdate = data;
    });

    if(localStorage.getItem("llt-date")!=((new Date()).getDate()+"")){
      console.log("session expired");
      access_service.Logout();
    }else{
      console.log("session available");
      var json = JSON.parse(localStorage.getItem("llt-userdata")+"");
      if(json!=null || json!=""){
        access_service.LoadData(json);
      }
    }

    console.log(typeof access_service.GetData());


    // var date = new Date().getDate().toString().padStart(2,"0");
    // var month = new Date().getMonth().toString().padStart(2,"0");
    // var year = new Date().getFullYear().toString();

    // var finaldata = year+month+date;


    // console.log(typeof finaldata);
    // console.log(finaldata);

  }

}
