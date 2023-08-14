import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptographyService {

  private cipherText:string = "";
  private plainText:string = "";
  private key = environment.cryptoKey;

  public encryption(plaintext:String):string{
    this.cipherText = "";
    for(let index=0;index<plaintext.length;index++){
      var temp = plaintext.charCodeAt(index)+this.key;
      this.cipherText+=String.fromCharCode(temp);
    }
    return this.cipherText;
  }

  public decryption(ciphertext:any):string{
    this.plainText="";
    for(let index=0;index<ciphertext.length;index++){
      var temp = ciphertext.charCodeAt(index)-this.key;
      this.plainText+=String.fromCharCode(temp);
    }
    return this.plainText;
  }
}
