import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate) {
    console.log('[swUpdate.isEnabled]',swUpdate.isEnabled);
    if (swUpdate.isEnabled) {
      swUpdate.versionUpdates.subscribe(evt => {
        switch (evt.type) {
          case 'VERSION_DETECTED':
            console.log(`Downloading new app version: ${evt.version.hash}`);
            break;
          case 'VERSION_READY':
            console.log(`Current app version: ${evt.currentVersion.hash}`);
            console.log(`New app version ready for use: ${evt.latestVersion.hash}`);
            break;
          case 'VERSION_INSTALLATION_FAILED':
            console.log(`Failed to install app version '${evt.version.hash}': ${evt.error}`);
            break;
        }
      });
    }
  }

  public checkForUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate().then((res) => {
        console.log('[checkForUpdate]', res);
      });
    }
  }

  public activateUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then((res) => {
        console.log('[activateUpdate]', res);
      });
    }
  }






}
