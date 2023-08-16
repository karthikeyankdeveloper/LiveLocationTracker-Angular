import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-kit',
  templateUrl: './kit.component.html',
  styleUrls: ['./kit.component.css'],
  standalone:true,
  imports:[CommonModule,ReactiveFormsModule,RouterModule]
})
export class KitComponent {

  protected finalKitList: any;
  protected noDataPrevent:boolean = environment.conditionFalse;
  protected viewModel:boolean = environment.conditionFalse;
  private getAllKitSubscription:any;

  constructor(private databaseService: DatabaseService, private formBuilder: FormBuilder) {
    this.getAllKit();
  }

  private getAllKit():void {
    this.noDataPrevent = false;
    this.getAllKitSubscription = this.databaseService.getAllKit().subscribe((data) => {
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
      this.databaseService.getKit(values.id).subscribe((data) => {
        if (data == null) {
          var data1 = {
            [values.id + ""]: values
          };
          this.databaseService.addNewKit(data1).subscribe((response) => {
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
