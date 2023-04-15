import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  private url = "https://check-firebase-b36c8-default-rtdb.firebaseio.com/";

  constructor(private httpclient: HttpClient) { }

  public DBcheck() {
    return this.httpclient.get(this.url + "check.json");
  }

  public GetUser(email: string) {
    return this.httpclient.get(this.url + "UserList/" + this.KeyMail(email) + ".json",{responseType:'json'});
  }

  public AddUser(insertdata: any) {
    var finaldata = {
      [this.KeyMail(insertdata.email)]: insertdata
    }
    return this.httpclient.patch(this.url + "UserList.json", finaldata);
  }

  public GetAllUserData(){
    return this.httpclient.get(this.url+"UserList.json",{responseType:'json'});
  }

  public Block(email:string,condition:boolean){
    var data = {
      "block":condition
    }
    return this.httpclient.patch(this.url+"UserList/"+this.KeyMail(email)+".json",data);
  }

  public UpdatePassword(email:string,password:string){

    var data = {
      "password":password
    }

    return this.httpclient.patch(this.url+"UserList/"+this.KeyMail(email)+".json",data);
  }


  public AddOrder(){

    var dateinstance = new Date();
    var year = dateinstance.getFullYear().toString();
    var month = (dateinstance.getMonth()+1).toString().padStart(2,"0");
    var date = dateinstance.getDate().toString().padStart(2,"0");

    var ref = date+month+year;
    var fulldate = date+"-"+month+"-"+year;

    var insert = {"name":"Karthikeyan","email":"kk@gmail.com","status":"pending","kitid":"1","fulladdress":"","mobile":"1212","paymentid":"as1212dsd"};
    Object.assign(insert,{"ref":ref,"fulldate":fulldate})
    return this.httpclient.post(this.url+"Orders.json",insert);
  }


  public GetAllOrder(){
    return this.httpclient.get(this.url+"Orders.json");
  }


  public GetOrder(key:string){
    return this.httpclient.get(this.url+"Orders/"+key+".json");
  }

  public ToggleOrder(key:string,condition:boolean){
    var data = {
      status:condition
    }
    return this.httpclient.patch(this.url+"Orders/"+key+".json",data);
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
