import { Injectable } from '@angular/core';
import { Environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private url = Environment.getUrl();

  constructor(private httpClient: HttpClient) {}

  public checkDatabase():Observable<any>{
    return this.httpClient.get(this.url + "update.json");
  }

  public getTimestamp(){
    return this.httpClient.put(this.url+"time.json",{".sv":"timestamp"});
  }

  public GetUser(email: string) {
    return this.httpClient.get(this.url + "UserList/" + this.KeyMail(email) + ".json",{responseType:'json'});
  }

  public AddUser(insertdata: any) {
    var finaldata = {
      [this.KeyMail(insertdata.email)]: insertdata
    }
    return this.httpClient.patch(this.url + "UserList.json", finaldata);
  }

  public UpdateProfile(email:any,data:any){
    return this.httpClient.patch(this.url+"UserList/"+this.KeyMail(email)+".json",data);
  }

  public UserAddOrder(email:string,data:any){
    return this.httpClient.patch(this.url+"UserList/"+this.KeyMail(email)+"/order.json",data);
  }
  public UserAddDevice(email:string,data:any){
    return this.httpClient.patch(this.url+"UserList/"+this.KeyMail(email)+"/device.json",data);
  }

  public GetAllUserData(){
    return this.httpClient.get(this.url+"UserList.json",{responseType:'json'});
  }

  public Block(email:string,condition:boolean){
    var data = {
      "block":condition
    }
    return this.httpClient.patch(this.url+"UserList/"+this.KeyMail(email)+".json",data);
  }

  public UpdatePassword(email:string,password:string){

    var data = {
      "password":password,
      "timestamp":{
        ".sv":"timestamp"
      }
    }

    return this.httpClient.patch(this.url+"UserList/"+this.KeyMail(email)+".json",data);
  }


  public AddOrder(orderdata:any){
    return this.httpClient.post(this.url+"Orders.json",orderdata);
  }


  public GetAllOrder(){
    return this.httpClient.get(this.url+"Orders.json");
  }


  public GetOrder(key:string){
    return this.httpClient.get(this.url+"Orders/"+key+".json");
  }

  public ToggleOrder(key:string,condition:string){
    var data = {
      status:condition
    }
    return this.httpClient.patch(this.url+"Orders/"+key+".json",data);
  }

  public GetKit(id:any){
    return this.httpClient.get(this.url+"Kits/"+id+".json");
  }


  public GetAllKit(){
    return this.httpClient.get(this.url+"Kits.json",{responseType:'json'});
  }

  public AddNewKit(data:any){
    return this.httpClient.patch(this.url+"Kits.json",data);
  }

  public UpdateKit(id:any,data:any){
    return this.httpClient.patch(this.url+"Kits/"+id+".json",data);
  }

  public DeleteKit(id:any){
    return this.httpClient.delete(this.url+"Kits/"+id+".json");
  }

  public DeleteUserDevice(email:any,uid:any){
    return this.httpClient.delete(this.url+"UserList/"+this.KeyMail(email)+"/device/"+uid+".json");
  }

  public DeleteRemote(uid:any){
    return this.httpClient.delete(this.url+"Remote/"+uid+".json");
  }

  public CancelOrder(orderid:any){
    return this.httpClient.patch(this.url+"Orders/"+orderid+".json",{status:"Cancelled"});
  }


  public MapFetch(id:any){
    return this.httpClient.get(this.url+"Remote/"+id+".json");
  }

  public AddRemoteKit(data:any){
    return this.httpClient.patch(this.url+"Remote.json",data);
  }

  public UpdateRemote(uid:any,data:any){
    return this.httpClient.patch(this.url+"Remote/"+uid+".json",data);
  }



  private KeyMail(email: string) {
    var keymail = "";
    for (let i = 0; i < email.length; i++) {
      if (!(email.charAt(i) == ' ' || email.charAt(i) == '.' || email.charAt(i) == '$' || email.charAt(i) == '#' || email.charAt(i) == '/' || email.charAt(i) == '[' || email.charAt(i) == ']')) {
        keymail += email.charAt(i);
      }
    }
    return keymail + "";
  }
}
