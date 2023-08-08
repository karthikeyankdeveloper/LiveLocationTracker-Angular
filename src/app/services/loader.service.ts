import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loader:boolean = Environment.conditionFalse;
  private userloader:boolean = Environment.conditionFalse;


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
