/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeserviceService } from '../Services/homeservice.service';
import { ModalController } from '@ionic/angular';
import { UtilService } from '../Services/util.service';

@Component({
  selector: 'app-favourite-modal',
  templateUrl: './favourite-modal.page.html',
  styleUrls: ['./favourite-modal.page.scss'],
})
export class FavouriteModalPage implements OnInit {
  price: any;
  station: any;
  favform: FormGroup;
  isSubmitted = false;
  reportdetail;
  constructor(public fb: FormBuilder,
    public homeService: HomeserviceService,
    public modalCtrl: ModalController,
    public utilService: UtilService) { }

  ngOnInit() {
    this.favform = this.fb.group({
      petrolPrice: ['', [Validators.required]],
      disalPrice: ['', [Validators.required]],
    });

    this.favform.patchValue({
      petrolPrice: this.reportdetail.price,
      disalPrice: this.reportdetail.d_price
    });
  }

  priceUpdate() {
    this.isSubmitted = true;
    if (this.favform.valid) {
      const params = {
        id: this.reportdetail.p_station_id,
        price: this.favform.controls.petrolPrice.value,
        d_price: this.favform.controls.disalPrice.value,
      };
      this.homeService.getupdateprice(params).subscribe((res) => {
        this.station = res.data;
        if (res) {
          this.utilService.showToastSucccess('Price Updated successfully');
          this.modalCtrl.dismiss();
        }
      }, err => {
        this.utilService.showToastError(err);
        this.modalCtrl.dismiss();
      });
    }
  }
}
