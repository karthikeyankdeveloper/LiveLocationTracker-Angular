import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class Environment{

  public static getUrl():string{
    return this.databaseUrl;
  }

  private static databaseUrl:string = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";
  public static conditionTrue:boolean = true;
  public static conditionFalse:boolean = false;
  public static cryptoKey:number = 3;


}
