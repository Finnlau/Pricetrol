/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeserviceService } from '../Services/homeservice.service';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../Services/util.service';

@Component({
  selector: 'app-price-sheet',
  templateUrl: './price-sheet.page.html',
  styleUrls: ['./price-sheet.page.scss'],
})
export class PriceSheetPage implements OnInit {
  station: any;
  reportform: FormGroup;
  isSubmitted = false;
  markerDetail;
  constructor(
    public fb: FormBuilder,
    public homeService: HomeserviceService,
    public modalCtrl: ModalController,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.reportform = this.fb.group({
      petrolPrice: ['', [Validators.required]],
      disalPrice: ['', [Validators.required]],
    });

    this.reportform.patchValue({
      petrolPrice: this.markerDetail?.price,
      disalPrice: this.markerDetail?.d_price,
    });
  }

  priceUpdate() {
    this.isSubmitted = true;
    if (this.reportform.valid) {
      const params = {
        id: this.markerDetail.id,
        price: this.reportform.controls.petrolPrice.value,
        d_price: this.reportform.controls.disalPrice.value,
      };

      this.homeService.getupdateprice(params).subscribe(
        (res) => {
          this.station = res.data;
          if (res) {
            this.utilService.showToastSucccess('Price Updated successfully');
            this.modalCtrl.dismiss();
          }
        },
        (err) => {
          this.utilService.showToastError(err);
          this.modalCtrl.dismiss();
        }
      );
    }
  }
}
