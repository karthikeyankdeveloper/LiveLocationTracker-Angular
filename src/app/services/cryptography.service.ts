import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  private ciphertext:any;
  private plaintext:any;
  private key = 3;

  constructor() { }


  public Encryption(plaintext:String){
    this.ciphertext = "";

    for(let i=0;i<plaintext.length;i++){
      var j = plaintext.charCodeAt(i)+this.key;
      this.ciphertext+=String.fromCharCode(j);
    }

    return this.ciphertext;

  }

  public Decryption(ciphertext:any){

    this.plaintext="";

    for(let i=0;i<ciphertext.length;i++){
      var j = ciphertext.charCodeAt(i)-this.key;
      this.plaintext+=String.fromCharCode(j);
    }

    return this.plaintext;

  }
}
