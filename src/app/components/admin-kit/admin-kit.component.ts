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
    price: [, [Validators.required]],
    img: [, [Validators.required]]
  });



  public AddNewKit() {

    var id = this.AddKitForm.controls["id"].value;
    var name = this.AddKitForm.controls["name"].value;
    var desc = this.AddKitForm.controls["desc"].value;
    var price = this.AddKitForm.controls["price"].value;
    var img = this.AddKitForm.controls["img"].value;

    var values = this.AddKitForm.value;

    if (id == null || id == "" || name == null || name == "" || desc == null || desc == "" || price == null || price == "" || img == null || img == "") {
      alert("Invalid Data");
    } else {

      this.ToggleView();

      this.NoDataPrevent = false;

      this.dbservice.GetKit(id).subscribe((tt) => {

        if (tt == null) {

          Object.assign(values, { available: true });
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
