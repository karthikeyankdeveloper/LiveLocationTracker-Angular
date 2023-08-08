import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url:string = Environment.getUrl();

  constructor(private httpClient: HttpClient) {}

  public checkDatabase():Observable<Object>{
    return this.httpClient.get(this.url + "update.json");
  }

  public getTimestamp():Observable<Object>{
    return this.httpClient.put(this.url+"time.json",{".sv":"timestamp"});
  }

  public GetUser(email: string):Observable<Object> {
    return this.httpClient.get(this.url + "UserList/" + this.convertKeyMail(email) + ".json",{responseType:'json'});
  }

  public AddUser(insertdata: any):Observable<Object> {
    var finaldata = {
      [this.convertKeyMail(insertdata.email)]: insertdata
    }
    return this.httpClient.patch(this.url + "UserList.json", finaldata);
  }

  public UpdateProfile(email:any,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public UserAddOrder(email:string,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/order.json",data);
  }
  public UserAddDevice(email:string,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/device.json",data);
  }

  public GetAllUserData():Observable<Object>{
    return this.httpClient.get(this.url+"UserList.json",{responseType:'json'});
  }

  public Block(email:string,condition:boolean):Observable<Object>{
    var data = {
      "block":condition
    }
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public UpdatePassword(email:string,password:string):Observable<Object>{

    var data = {
      "password":password,
      "timestamp":{
        ".sv":"timestamp"
      }
    }

    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }


  public AddOrder(orderdata:any):Observable<Object>{
    return this.httpClient.post(this.url+"Orders.json",orderdata);
  }


  public GetAllOrder():Observable<Object>{
    return this.httpClient.get(this.url+"Orders.json");
  }


  public GetOrder(key:string):Observable<Object>{
    return this.httpClient.get(this.url+"Orders/"+key+".json");
  }

  public ToggleOrder(key:string,condition:string):Observable<Object>{
    var data = {
      status:condition
    }
    return this.httpClient.patch(this.url+"Orders/"+key+".json",data);
  }

  public GetKit(id:any):Observable<Object>{
    return this.httpClient.get(this.url+"Kits/"+id+".json");
  }


  public GetAllKit():Observable<Object>{
    return this.httpClient.get(this.url+"Kits.json",{responseType:'json'});
  }

  public AddNewKit(data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Kits.json",data);
  }

  public UpdateKit(id:any,data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Kits/"+id+".json",data);
  }

  public DeleteKit(id:any):Observable<Object>{
    return this.httpClient.delete(this.url+"Kits/"+id+".json");
  }

  public DeleteUserDevice(email:any,uid:any):Observable<Object>{
    return this.httpClient.delete(this.url+"UserList/"+this.convertKeyMail(email)+"/device/"+uid+".json");
  }

  public DeleteRemote(uid:any):Observable<Object>{
    return this.httpClient.delete(this.url+"Remote/"+uid+".json");
  }

  public CancelOrder(orderid:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Orders/"+orderid+".json",{status:"Cancelled"});
  }


  public MapFetch(id:any):Observable<Object>{
    return this.httpClient.get(this.url+"Remote/"+id+".json");
  }

  public AddRemoteKit(data:any):Observable<Object>{
    return this.httpClient.patch(this.url+"Remote.json",data);
  }

  public UpdateRemote(uid:any,data:any):Observable<Object>{
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
