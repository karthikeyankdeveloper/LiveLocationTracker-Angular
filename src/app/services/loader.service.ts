import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader:boolean = environment.conditionFalse;
  private userloader:boolean = environment.conditionFalse;


  public getLoader():boolean{
    return this.loader;
  }

  public setLoader(loader:any):void{
    this.loader = loader;
  }

  public getUserLoader():boolean{
    return this.userloader;
  }

  public setUserLoader(userloader:any):void{
    this.userloader = userloader;
  }
}
