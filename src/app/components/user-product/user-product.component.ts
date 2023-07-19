import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { DBService } from 'src/app/services/db.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent {

  private getKitSubscription: any;
  private getUserSubscription: any;
  private getMapKitSubscription1: any;
  private getMapKitSubscription2: any;

  protected KitData: any;
  protected UserData: any;
  protected PaymentID: any;
  protected View: boolean = false;
  protected paymentView: boolean = false;
  protected paymentSuccessView: boolean = false;

  constructor(private builder: FormBuilder, private loaderService: LoaderService, private route: ActivatedRoute, private router: Router, private dbService: DBService, private accessService: AccessService) {

    loaderService.SetUserLoading(true);

    this.route.queryParamMap.subscribe((id) => {
      var idref = id.get("id");
      if (idref == null || idref == "") {
        this.router.navigate(["/user/buy"], { replaceUrl: true });
      } else {

        this.getKitSubscription = this.dbService.GetKit(idref).subscribe((kitdata) => {
          if (kitdata != null) {
            this.KitData = kitdata;

            this.getUserSubscription = this.dbService.GetUser(accessService.GetEmail()).subscribe((userdata) => {
              this.UserData = userdata;
              this.makeViewStopLoading();
            });

          } else {
            this.router.navigate(["/user/buy"], { replaceUrl: true });
          }
        });

      }

    });

    this.UIDForm.controls['uid'].valueChanges.subscribe(() => {
      this.enable_message = false;
    });

  }

  protected UIDForm = this.builder.group({
    uid: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]]
  });



  protected enable_avail = false;
  protected enable_message = false;

  protected availabilityBtn(): void {
    if (this.UIDForm.valid) {
      var uid_input = (this.UIDForm.controls['uid'].value + "").toLowerCase();
      this.loaderService.SetUserLoading(true);
      this.getMapKitSubscription1 = this.dbService.MapFetch(uid_input).subscribe((mapdata) => {
        this.enable_message = true;
        if (mapdata != null) {
          this.enable_avail = false;
        } else {
          this.enable_avail = true;
        }
        this.makeViewStopLoading();
      });
    }
  }

  protected placeOrder(): void {
    if (this.UIDForm.valid) {
      var uid_input = (this.UIDForm.controls['uid'].value + "").toLowerCase();

      if (this.UserData.address != null && this.UserData.address != '' && this.UserData.pincode != null && this.UserData.pincode != '' && this.UserData.phone != null && this.UserData.phone != '') {
        this.loaderService.SetUserLoading(true);
        this.getMapKitSubscription2 = this.dbService.MapFetch(uid_input).subscribe((mapdata) => {
          if (mapdata != null) {
            alert("UID Not Available");
            this.makeViewStopLoading();
          } else {
            this.enablePaymentView();
          }
        });
      }
      else {
        alert("Update Your contact info");
      }
    } else {
      alert("Enter Valid details");
    }

  }

  protected enablePaymentView() {
    this.paymentView = true;
  }

  protected disablePaymentView() {
    this.paymentView = false;
    setTimeout(() => {
      this.makeViewStopLoading();
    }, 500);
  }

  protected makePaymentSuccess() {
    this.paymentView = false;
    var uid = (this.UIDForm.controls['uid'].value + "").toLowerCase();
    var paymentid = Math.floor(Math.random() * 899999999) + 100000000;
    this.PaymentID = paymentid;

    var orderdata = {
      name: this.UserData.name,
      email: this.UserData.email,
      address: this.UserData.address,
      pincode: this.UserData.pincode,
      phone: this.UserData.phone,
      uid: uid,
      kitid: this.KitData.id,
      kitname: this.KitData.name,
      kitimg: this.KitData.img,
      kitprice: this.KitData.discountprice,
      timestamp: {
        ".sv": "timestamp"
      },
      status: "Order Placed",
      paymentid: paymentid,
    }

    this.dbService.GetKit(this.KitData.id).subscribe((stock_check) => {

      var temp_stock_check = JSON.parse(JSON.stringify(stock_check));
      if (temp_stock_check.stock > 10) {

        this.dbService.AddOrder(orderdata).subscribe((orderresponse) => {
          var orderresponse_json = JSON.parse(JSON.stringify(orderresponse));

          var order_detail = {
            [orderresponse_json.name]: orderresponse_json.name
          }
          var device_detail = {
            [uid]: uid
          }

          var update_remote = {
            [uid]: {
              active: false,
              password: Math.floor(Math.random() * 899999) + 100000
            }
          }

          this.dbService.UserAddOrder(this.UserData.email, order_detail).subscribe((response) => {});

          this.dbService.UserAddDevice(this.UserData.email, device_detail).subscribe((response) => {});

          this.dbService.AddRemoteKit(update_remote).subscribe((response) => {});

          this.dbService.GetKit(this.KitData.id).subscribe((kit_data) => {

            var temp = JSON.parse(JSON.stringify(kit_data));

            var stock = {
              stock: --temp.stock
            }

            this.dbService.UpdateKit(this.KitData.id, stock).subscribe((response) => {
              this.makeViewStopLoading();
              this.paymentSuccessView = true;
            });

          });


        });

      } else {
        alert("Sorry for inconvenience , No stock available");
        this.makeViewStopLoading();
      }

    });


  }


  private makeViewStopLoading(): void {
    this.loaderService.SetUserLoading(false);
    if (!this.View) {
      this.View = true;
    }
  }

  ngOnDestroy() {
    if (this.getKitSubscription) {
      this.getKitSubscription.unsubscribe();
    }

    if (this.getUserSubscription) {
      this.getUserSubscription.unsubscribe();
    }

    if (this.getMapKitSubscription1) {
      this.getMapKitSubscription1.unsubscribe();
    }

    if (this.getMapKitSubscription2) {
      this.getMapKitSubscription2.unsubscribe();
    }

    this.makeViewStopLoading();
  }

}
