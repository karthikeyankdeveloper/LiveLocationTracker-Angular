import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DBService } from 'src/app/services/db.service';

@Component({
  selector: 'app-admin-kit',
  templateUrl: './admin-kit.component.html',
  styleUrls: ['./admin-kit.component.css']
})
export class AdminKitComponent {

  public FinalKitList: any;
  public NoDataPrevent = false;
  public ViewModel = false;

  constructor(private dbservice: DBService, private builder: FormBuilder) {
    this.GetAllKit();
  }

  public GetAllKit() {
    this.NoDataPrevent = false;

    this.dbservice.GetAllKit().subscribe((data) => {

      this.NoDataPrevent = true;

      this.FinalKitList = Object.values(data);

    });

  }

  public ToggleView() {
    this.ViewModel = !this.ViewModel;
  }


  AddKitForm = this.builder.group({
    id: [, [Validators.required]],
    name: [, [Validators.required]],
    desc: [, [Validators.required]],
    actualprice: [, [Validators.required]],
    discountprice: [, [Validators.required]],
    stock: [, [Validators.required]],
    img: [, [Validators.required]]
  });



  public AddNewKit() {
    var values = this.AddKitForm.value;

    if (this.AddKitForm.invalid) {
      alert("Invalid Data, Enter All detail");
    } else {

      this.ToggleView();

      this.NoDataPrevent = false;

      this.dbservice.GetKit(values.id).subscribe((tt) => {

        if (tt == null) {

          // Object.assign(values, { available: true });
          var data = {
            [values.id + ""]: values
          };

          this.dbservice.AddNewKit(data).subscribe((dat) => {
            this.GetAllKit();
          });

        } else {
          alert("Kit id already exists");
          this.NoDataPrevent = true;
        }
      });

    }

  }

}
