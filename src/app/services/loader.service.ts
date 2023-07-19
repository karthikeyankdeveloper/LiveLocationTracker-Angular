import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private sampleloader:boolean = false;

  constructor() {}

  public GetSampleLoader(){
    return this.sampleloader;
  }
  public SetSampleLoader(load:any){
    this.sampleloader = load;
  }


  // ----------For User-----------
  private userloading:boolean = false;

  public GetUserLoading(){
    return this.userloading;
  }

  public SetUserLoading(load:any){
    this.userloading = load;
  }



}
