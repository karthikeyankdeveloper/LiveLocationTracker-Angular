import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {


  public RemoteId: any;

  public loader = true;

  public timestamp:any;


  constructor(private route: ActivatedRoute, private router: Router, private dbservice: DBService) {
    route.queryParamMap.subscribe((query) => {

      this.RemoteId = query.get("id");

      if (this.RemoteId == null || this.RemoteId == "") {
        router.navigate(["/"], { replaceUrl: true });
      } else {
        this.FetchData();
      }

    });

  }


  public FetchData() {

    this.loader = true;

    this.dbservice.MapFetch(this.RemoteId).subscribe((data) => {

      if (data == null) {
        alert("No Data Found");
        this.router.navigate(["/"], { replaceUrl: true });
      } else {
        var jsodata = JSON.parse(JSON.stringify(data));
        var maps = document.getElementById('map');
        setTimeout(()=>{
          this.timestamp = new Date(jsodata.timestamp);
          if (maps) {
            this.loader = false;
            maps.innerHTML = '<iframe src="https://maps.google.com/maps?q=' + jsodata?.lat + ',' + jsodata?.lon + '&hl=en&z=16&t=k&amp;output=embed" style="border:0; width: 100%; height: 100%;" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
          }
        },1500);

      }

    });

  }

}
