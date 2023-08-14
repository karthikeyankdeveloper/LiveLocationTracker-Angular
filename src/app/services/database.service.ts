import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private readonly url:string = environment.databaseUrl;

  constructor(private httpClient: HttpClient) {}

  public checkDatabase():Observable<Object>{
    return this.httpClient.get(`${this.url}update.json`);
  }

  public getTimestamp():Observable<Object>{
    return this.httpClient.put(`${this.url}time.json`,{".sv":"timestamp"});
  }

  public getUser(email: string):Observable<Object> {
    return this.httpClient.get(`${this.url}UserList/${this.convertKeyMail(email)}.json`,{responseType:'json'});
  }

  public addUser(insertdata: any):Observable<Object> {
    var finaldata = {
      [this.convertKeyMail(insertdata.email)]: insertdata
    }
    return this.httpClient.patch(this.url + "UserList.json", finaldata);
  }

  public updateProfile(email:any,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public userAddOrder(email:string,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/order.json",data);
  }
  public userAddDevice(email:string,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/device.json",data);
  }

  public getAllUserData():Observable<Object>{
    return this.httpClient.get(this.url+"UserList.json",{responseType:'json'});
  }

  public block(email:string,condition:boolean):Observable<Object>{
    var data = {
      "block":condition
    }
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public updatePassword(email:string,password:string):Observable<Object>{
    var data = {
      "password":password,
      "timestamp":{
        ".sv":"timestamp"
      }
    }
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }


  public addOrder(orderdata:any):Observable<Object>{
    return this.httpClient.post(this.url+"Orders.json",orderdata);
  }


  public getAllOrder():Observable<Object>{
    return this.httpClient.get(this.url+"Orders.json");
  }


  public getOrder(key:string):Observable<Object>{
    return this.httpClient.get(this.url+"Orders/"+key+".json");
  }

  public toggleOrder(key:string,condition:string):Observable<Object>{
    var data = {
      status:condition
    }
    return this.httpClient.patch(this.url+"Orders/"+key+".json",data);
  }

  public getKit(id:any):Observable<Object>{
    return this.httpClient.get(this.url+"Kits/"+id+".json");
  }


  public getAllKit():Observable<Object>{
    return this.httpClient.get(this.url+"Kits.json",{responseType:'json'});
  }

  public addNewKit(data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Kits.json",data);
  }

  public updateKit(id:any,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Kits/"+id+".json",data);
  }

  public deleteKit(id:any):Observable<Object>{
    return this.httpClient.delete(this.url+"Kits/"+id+".json");
  }

  public deleteUserDevice(email:any,uid:any):Observable<Object>{
    return this.httpClient.delete(this.url+"UserList/"+this.convertKeyMail(email)+"/device/"+uid+".json");
  }

  public deleteRemote(uid:any):Observable<Object>{
    return this.httpClient.delete(this.url+"Remote/"+uid+".json");
  }

  public cancelOrder(orderid:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Orders/"+orderid+".json",{status:"Cancelled"});
  }

  public mapFetch(id:any):Observable<Object>{
    return this.httpClient.get(this.url+"Remote/"+id+".json");
  }

  public addRemoteKit(data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Remote.json",data);
  }

  public updateRemote(uid:any,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Remote/"+uid+".json",data);
  }

  private convertKeyMail(email: string):string {
    let keyMail = "";
    for (let index = 0; index < email.length; index++) {
      if (!(email.charAt(index) == ' ' || email.charAt(index) == '.' || email.charAt(index) == '$' || email.charAt(index) == '#' || email.charAt(index) == '/' || email.charAt(index) == '[' || email.charAt(index) == ']')) {
        keyMail += email.charAt(index);
      }
    }
    return keyMail + "";
  }
}
