import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class Properties{

  private static dbUrl = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";

  protected static getUrl():String{
    return this.dbUrl;
  }
}
