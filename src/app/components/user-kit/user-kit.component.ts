import { Component } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-user-kit',
  templateUrl: './user-kit.component.html',
  styleUrls: ['./user-kit.component.css']
})
export class UserKitComponent {

  public NoDataPrevent=false;
  public FinalKitList:any;

  constructor(private dbservice:DBService,private accessservice:AccessService){

    dbservice.GetUser(accessservice.GetEmail()).subscribe((data)=>{

      var userdata = JSON.parse(JSON.stringify(data));
      if(userdata?.mykit!=null){
        this.GetEachRemote(Object.keys(userdata.mykit));
      }else{
        this.NoDataPrevent=true;
      }
    });

  }

  private GetEachRemote(keys:any){
    var finaldata:any = [];

    for(let k of keys){
      this.dbservice.MapFetch(k).subscribe((data)=>{
        var temp = JSON.parse(JSON.stringify(data));
        Object.assign(temp,{id:k});
        if(temp.timestamp==false){
          Object.assign(temp,{date:false});
        }else{
          Object.assign(temp,{date:new Date(temp.timestamp)});
        }

        finaldata.push(temp);
      });
    }

    this.FinalKitList = finaldata;

    setTimeout(()=>{
      this.NoDataPrevent=true;
    },500);
  }

}
