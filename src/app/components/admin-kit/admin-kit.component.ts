import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Environment } from 'src/app/environment';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-admin-kit',
  templateUrl: './admin-kit.component.html',
  styleUrls: ['./admin-kit.component.css']
})
export class AdminKitComponent {

  protected finalKitList: any;
  protected noDataPrevent:boolean = Environment.conditionFalse;
  protected viewModel:boolean = Environment.conditionFalse;
  private getAllKitSubscription:any;

  constructor(private databaseService: DatabaseService, private formBuilder: FormBuilder) {
    this.getAllKit();
  }

  private getAllKit():void {
    this.noDataPrevent = false;
    this.getAllKitSubscription = this.databaseService.GetAllKit().subscribe((data) => {
      this.noDataPrevent = true;
      this.finalKitList = Object.values(data);
    });
  }

  protected toggleView():void {
    this.viewModel = !this.viewModel;
  }

  protected addKitForm:FormGroup<any> = this.formBuilder.group({
    id: [, [Validators.required]],
    name: [, [Validators.required]],
    desc: [, [Validators.required]],
    actualprice: [, [Validators.required]],
    discountprice: [, [Validators.required]],
    stock: [, [Validators.required]],
    img: [, [Validators.required]]
  });

  protected addNewKit():void {
    var values = this.addKitForm.value;
    if (this.addKitForm.invalid) {
      alert("Invalid Data, Enter All detail");
      LoggerService.warn("Invalid Input Data.");
    } else {
      this.toggleView();
      this.noDataPrevent = false;
      this.databaseService.GetKit(values.id).subscribe((data) => {
        if (data == null) {
          var data1 = {
            [values.id + ""]: values
          };
          this.databaseService.AddNewKit(data1).subscribe((response) => {
            LoggerService.info("New Kit added");
            this.getAllKit();
          });
        } else {
          alert("Kit id already exists");
          LoggerService.info("Kit id already exists.");
          this.noDataPrevent = true;
        }
      });
    }
  }

  ngOnDestroy(){
    if(this.getAllKitSubscription){
      this.getAllKitSubscription.unsubscribe();
    }
  }

}
