import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  public static log(message:string):void{
    console.log(`[LOG]: ${message}`);
  }

  public static info(message:string):void{
    console.info(`[INFO]: ${message}`);
  }

  public static warn(message:string):void{
    console.warn(`[WARNING]: ${message}`);
  }

  public static error(message:string):void{
    console.error(`[ERROR]: ${message}`);
  }
}
