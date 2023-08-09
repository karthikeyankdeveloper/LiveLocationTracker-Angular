import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Environment } from 'src/app/environment';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy{

  protected remoteId:any;
  protected loader:boolean = Environment.conditionTrue;
  protected timestamp:any;
  private reload:boolean = Environment.conditionFalse;
  private mapFetchSubscription:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private databaseService: DatabaseService) {
    this.activatedRoute.queryParamMap.subscribe((query) => {
      this.remoteId = query.get("id");
      if (this.remoteId == null || this.remoteId == "") {
        router.navigate(["/"], { replaceUrl: true });
        LoggerService.warn("Unable to fetch data, UID Not Found");
      } else {
        this.fetchData();
      }
    });
  }

  protected fetchData():void{
    this.loader = true;
    this.mapFetchSubscription = this.databaseService.MapFetch(this.remoteId).subscribe((data) => {
      if (data == null) {
        alert("No Data Found");
        LoggerService.warn("Unable to fetch data, UID Not Found");
        this.router.navigate(["/"], { replaceUrl: Environment.conditionTrue });
      } else {
        let jsonData = JSON.parse(JSON.stringify(data));
        if (jsonData.active == false) {
          alert("Device Not Yet Activated");
          LoggerService.info("Device Not Yet Activated");
          this.router.navigate(["/"], { replaceUrl: Environment.conditionTrue });
        }
        else if (jsonData.enable == false) {
          alert("Device currrently disabled");
          LoggerService.info("Device currrently disabled");
          this.router.navigate(["/"], { replaceUrl: Environment.conditionTrue });
        }
        else if(this.reload || prompt("Enter Password")==jsonData.password  ){
          this.reload = Environment.conditionTrue;
          let maps = document.getElementById('map');
          setTimeout(() => {
            this.timestamp = new Date(jsonData.timestamp);
            if (maps) {
              this.loader = false;
              maps.innerHTML = '<iframe src="https://maps.google.com/maps?q=' + jsonData?.lat + ',' + jsonData?.lon + '&hl=en&z=16&t=k&amp;output=embed" style="border:0; width: 100%; height: 100%;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
            }
          }, 1500);
        }
        else {
          alert("Incorrect Password");
          LoggerService.info("Entered Device Password Incorrect");
          if(confirm("Are you want to retry !")){
            this.fetchData();
          }else{
          this.router.navigate(["/"], { replaceUrl: Environment.conditionTrue });
          }
        }
      }

    });
  }

  ngOnDestroy(){
    if(this.mapFetchSubscription){
      this.mapFetchSubscription.unsubscribe();
    }
  }

}
