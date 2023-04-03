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
}
