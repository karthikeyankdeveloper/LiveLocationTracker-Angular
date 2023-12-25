import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private update:SwUpdate) {
    if(update.isEnabled){
      update.versionUpdates.subscribe((event)=>{
        console.log("Event",event);
      });
    }

  }

  public checkForUpdate():Promise<boolean>{
    return this.update.checkForUpdate();
  }

  public activateUpdate():Promise<boolean>{
    return this.update.activateUpdate();
  }

}
