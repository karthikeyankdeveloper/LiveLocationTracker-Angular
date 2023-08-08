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

  public checkDatabase():Observable<any>{
    return this.httpClient.get(this.url + "update.json");
  }

  public getTimestamp():Observable<any>{
    return this.httpClient.put(this.url+"time.json",{".sv":"timestamp"});
  }

  public GetUser(email: string):Observable<any> {
    return this.httpClient.get(this.url + "UserList/" + this.convertKeyMail(email) + ".json",{responseType:'json'});
  }

  public AddUser(insertdata: any):Observable<any> {
    var finaldata = {
      [this.convertKeyMail(insertdata.email)]: insertdata
    }
    return this.httpClient.patch(this.url + "UserList.json", finaldata);
  }

  public UpdateProfile(email:any,data:any):Observable<any>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public UserAddOrder(email:string,data:any):Observable<any>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/order.json",data);
  }
  public UserAddDevice(email:string,data:any):Observable<any>{
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+"/device.json",data);
  }

  public GetAllUserData():Observable<any>{
    return this.httpClient.get(this.url+"UserList.json",{responseType:'json'});
  }

  public Block(email:string,condition:boolean):Observable<any>{
    var data = {
      "block":condition
    }
    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }

  public UpdatePassword(email:string,password:string):Observable<any>{

    var data = {
      "password":password,
      "timestamp":{
        ".sv":"timestamp"
      }
    }

    return this.httpClient.patch(this.url+"UserList/"+this.convertKeyMail(email)+".json",data);
  }


  public AddOrder(orderdata:any):Observable<any>{
    return this.httpClient.post(this.url+"Orders.json",orderdata);
  }


  public GetAllOrder():Observable<any>{
    return this.httpClient.get(this.url+"Orders.json");
  }


  public GetOrder(key:string):Observable<any>{
    return this.httpClient.get(this.url+"Orders/"+key+".json");
  }

  public ToggleOrder(key:string,condition:string):Observable<any>{
    var data = {
      status:condition
    }
    return this.httpClient.patch(this.url+"Orders/"+key+".json",data);
  }

  public GetKit(id:any):Observable<any>{
    return this.httpClient.get(this.url+"Kits/"+id+".json");
  }


  public GetAllKit():Observable<any>{
    return this.httpClient.get(this.url+"Kits.json",{responseType:'json'});
  }

  public AddNewKit(data:any):Observable<any>{
    return this.httpClient.patch(this.url+"Kits.json",data);
  }

  public UpdateKit(id:any,data:any):Observable<any>{
    return this.httpClient.patch(this.url+"Kits/"+id+".json",data);
  }

  public DeleteKit(id:any):Observable<any>{
    return this.httpClient.delete(this.url+"Kits/"+id+".json");
  }

  public DeleteUserDevice(email:any,uid:any):Observable<any>{
    return this.httpClient.delete(this.url+"UserList/"+this.convertKeyMail(email)+"/device/"+uid+".json");
  }

  public DeleteRemote(uid:any):Observable<any>{
    return this.httpClient.delete(this.url+"Remote/"+uid+".json");
  }

  public CancelOrder(orderid:any):Observable<any>{
    return this.httpClient.patch(this.url+"Orders/"+orderid+".json",{status:"Cancelled"});
  }


  public MapFetch(id:any):Observable<any>{
    return this.httpClient.get(this.url+"Remote/"+id+".json");
  }

  public AddRemoteKit(data:any):Observable<any>{
    return this.httpClient.patch(this.url+"Remote.json",data);
  }

  public UpdateRemote(uid:any,data:any):Observable<any>{
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
