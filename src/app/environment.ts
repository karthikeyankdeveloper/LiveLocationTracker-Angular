import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})

export class Environment{

  private static readonly databaseUrl:string = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";
  public static readonly conditionTrue:boolean = true;
  public static readonly conditionFalse:boolean = false;
  public static readonly cryptoKey:number = 3;
  public static getUrl():string{return this.databaseUrl;}

}
