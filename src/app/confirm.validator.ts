import { FormGroup } from "@angular/forms";

export function confirmValidator(parmName:string,parmPassword:string,parmRepassword:string) {

  return (formgroup:FormGroup)=>{

    var name = formgroup.controls[parmName];
    var namex = (name.value+"").toLowerCase();
    var password = formgroup.controls[parmPassword];
    var repassword = formgroup.controls[parmRepassword];


    if(!(namex=="") && namex.length<2){
      name.setErrors({nameLengthError:true});
    }else if(!(namex=="")){
      for(let i=0;i<namex.length;i++){
        if(!(97<=namex.charCodeAt(i) && namex.charCodeAt(i)<=122)){
          name.setErrors({nameAlphabetError:true});
          break;
        }
      }
    }



    if(password.value!==repassword.value){
      repassword.setErrors({passwordmatcher:true});
    }else{
      // repassword.setErrors({passwordmatcher:false});
      repassword.setErrors(null);
    }

  }

}


