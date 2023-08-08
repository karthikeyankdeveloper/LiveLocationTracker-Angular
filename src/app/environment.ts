import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class Environment{

  private static databseUrl = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";

  protected static getUrl():String{
    return this.databseUrl;
  }
}
