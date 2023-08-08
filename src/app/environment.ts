import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class Environment{

  private static databaseUrl:String = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";

  public static getUrl():String{
    return this.databaseUrl;
  }
}
