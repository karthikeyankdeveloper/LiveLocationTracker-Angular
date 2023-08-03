import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-viewkit',
  templateUrl: './admin-viewkit.component.html',
  styleUrls: ['./admin-viewkit.component.css']
})
export class AdminViewkitComponent {

  private KitId:any;
  public Finaldata:any;
  public Preventload=false;


  constructor(private builder:FormBuilder,private route:ActivatedRoute,private router:Router,private dbservice:DBService){}


  UpdateForm = this.builder.group({
    name:[],
    desc:[],
    img:[],
    actualprice:[],
    discountprice:[],
    stock:[]
  });



  ngOnInit(): void {

    this.route.queryParamMap.subscribe((query)=>{
      this.KitId = query.get('id');

      if(this.KitId==null||this.KitId==''){
        this.router.navigate(['admin/kit'],{replaceUrl:true});
      }else{
        this.GetKit(this.KitId);
      }
    });

  }

  private GetKit(id:any){

    this.Preventload = false;

    this.dbservice.GetKit(id).subscribe((data)=>{
      if(data==null){
        alert("No data Found!");
        this.router.navigate(['admin/kit'],{replaceUrl:true});
      }else{

        this.Preventload = true;
        this.Finaldata = data;

        this.UpdateForm.controls["name"].setValue(this.Finaldata.name);
        this.UpdateForm.controls["desc"].setValue(this.Finaldata.desc);
        this.UpdateForm.controls["img"].setValue(this.Finaldata.img);
        this.UpdateForm.controls["actualprice"].setValue(this.Finaldata.actualprice);
        this.UpdateForm.controls["discountprice"].setValue(this.Finaldata.discountprice);
        this.UpdateForm.controls["stock"].setValue(this.Finaldata.stock);
      }
    });

  }


  public Update():void{

    if(this.UpdateForm.invalid){
      alert("Invalid data");
    }else{
      var datas = this.UpdateForm.value;

      this.Preventload = false;

      this.dbservice.UpdateKit(this.KitId,datas).subscribe((tt)=>{
        this.GetKit(this.KitId);
      });
    }

  }


  public DeleteKit(){

    if(confirm("Confirm Delete")){
      this.Preventload=false;
      this.dbservice.DeleteKit(this.KitId).subscribe((data)=>{
        alert("Deleted Successfully");
        this.router.navigate(['admin/kit'],{replaceUrl:true});
      });
    }
  }

}
