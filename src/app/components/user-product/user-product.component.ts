import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { DatabaseService } from 'src/app/services/database.service';
import { LoaderService } from 'src/app/services/loader.service';
import { LoggerService } from 'src/app/services/logger.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-user-product',
  templateUrl: './user-product.component.html',
  styleUrls: ['./user-product.component.css']
})
export class UserProductComponent implements OnDestroy{

  private getKitSubscription: any;
  private getUserSubscription: any;
  private getMapKitSubscription1: any;
  private getMapKitSubscription2: any;
  protected kitData: any;
  protected userData: any;
  protected paymentID: any;
  protected view: boolean = environment.conditionFalse;
  protected paymentView: boolean = environment.conditionFalse;
  protected paymentSuccessView: boolean = environment.conditionFalse;

  constructor(private formBuilder: FormBuilder, private loaderService: LoaderService, private activatedRoute: ActivatedRoute, private router: Router, private databaseService: DatabaseService, private accessService: AccessService) {
    this.loaderService.setUserLoader(true);

    this.activatedRoute.queryParamMap.subscribe((id) => {
      let idref = id.get("id");
      if (idref == null || idref == "") {
        this.router.navigate(["/user/buy"], { replaceUrl: environment.conditionTrue });
      } else {
        this.getKitSubscription = this.databaseService.getKit(idref).subscribe((kitDataResponse) => {
          if (kitDataResponse != null) {
            this.kitData = kitDataResponse;
            this.getUserSubscription = this.databaseService.getUser(this.accessService.getEmail()).subscribe((userDataResponse) => {
              this.userData = userDataResponse;
              this.makeViewStopLoading();
            });
          } else {
            this.router.navigate(["/user/buy"], { replaceUrl: environment.conditionTrue });
          }
        });
      }

    });

    this.uidForm.controls['uid'].valueChanges.subscribe(() => {
      this.enableMessage = false;
    });

  }

  protected uidForm:FormGroup<any> = this.formBuilder.group({
    uid: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{4,16}$')]]
  });

  protected enableAvail = environment.conditionFalse;
  protected enableMessage = environment.conditionFalse;

  protected availabilityButton(): void {
    if (this.uidForm.valid) {
      let uidInput = (this.uidForm.controls['uid'].value + "").toLowerCase();
      this.loaderService.setUserLoader(true);
      this.getMapKitSubscription1 = this.databaseService.mapFetch(uidInput).subscribe((mapdata) => {
        this.enableMessage = true;
        if (mapdata != null) {
          this.enableAvail = false;
        } else {
          this.enableAvail = true;
        }
        this.makeViewStopLoading();
      });
    }
  }

  protected placeOrder(): void {
    if (this.uidForm.valid) {
      let uidInput = (this.uidForm.controls['uid'].value + "").toLowerCase();
      if (this.userData.address != null && this.userData.address != '' && this.userData.pincode != null && this.userData.pincode != '' && this.userData.phone != null && this.userData.phone != '') {
        this.loaderService.setUserLoader(true);
        this.getMapKitSubscription2 = this.databaseService.mapFetch(uidInput).subscribe((mapdata) => {
          if (mapdata != null) {
            alert("UID Not Available");
            LoggerService.info("uid not avaialble");
            this.makeViewStopLoading();
          } else {
            this.enablePaymentView();
          }
        });
      }
      else {
        alert("Update Your contact info");
        LoggerService.info("Update Your contact info");
      }
    } else {
      alert("Enter Valid details");
      LoggerService.info("Invalid detail");
    }
  }

  protected enablePaymentView():void {
    this.paymentView = true;
  }

  protected disablePaymentView():void {
    this.paymentView = false;
    setTimeout(() => {
      this.makeViewStopLoading();
    }, 500);
  }

  protected makePaymentSuccess():void {
    this.paymentView = false;
    var uid = (this.uidForm.controls['uid'].value + "").toLowerCase();
    var paymentid = Math.floor(Math.random() * 899999999) + 100000000;
    this.paymentID = paymentid;

    var orderdata = {
      name: this.userData.name,
      email: this.userData.email,
      address: this.userData.address,
      pincode: this.userData.pincode,
      phone: this.userData.phone,
      uid: uid,
      kitid: this.kitData.id,
      kitname: this.kitData.name,
      kitimg: this.kitData.img,
      kitprice: this.kitData.discountprice,
      timestamp: {
        ".sv": "timestamp"
      },
      status: "Order Placed",
      paymentid: paymentid,
    }

    this.databaseService.getKit(this.kitData.id).subscribe((stock_check) => {
      var temp_stock_check = JSON.parse(JSON.stringify(stock_check));
      if (temp_stock_check.stock > 10) {
        this.databaseService.addOrder(orderdata).subscribe((orderresponse) => {
          var orderresponse_json = JSON.parse(JSON.stringify(orderresponse));
          var order_detail = {[orderresponse_json.name]: orderresponse_json.name}
          var device_detail = {[uid]: uid}

          var update_remote = {
            [uid]: {
              active: false,
              password: Math.floor(Math.random() * 899999) + 100000,
              kitname: this.kitData.name,
              kitimg: this.kitData.img,
              uid:uid,
              enable:true,
              forascending:{
                ".sv":"timestamp"
              }
            }
          }

          this.databaseService.userAddOrder(this.userData.email, order_detail).subscribe((response) => {});

          this.databaseService.userAddDevice(this.userData.email, device_detail).subscribe((response) => {});

          this.databaseService.addRemoteKit(update_remote).subscribe((response) => {});

          this.databaseService.getKit(this.kitData.id).subscribe((kit_data) => {
            var temp = JSON.parse(JSON.stringify(kit_data));
            var stock = {stock: --temp.stock};
            this.databaseService.updateKit(this.kitData.id, stock).subscribe((response) => {
              this.makeViewStopLoading();
              LoggerService.info("Order placed successfully");
              this.paymentSuccessView = true;
            });
          });
        });

      } else {
        alert("Sorry for inconvenience , No stock available");
        LoggerService.info("No stock available");
        this.makeViewStopLoading();
      }
    });
  }

  private makeViewStopLoading(): void {
    this.loaderService.setUserLoader(false);
    if (!this.view) {
      this.view = true;
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
