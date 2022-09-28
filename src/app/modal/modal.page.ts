/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { PriceSheetPage } from '../price-sheet/price-sheet.page';
import { ModalController } from '@ionic/angular';
import { HomeserviceService } from '../Services/homeservice.service';
import { UtilService } from '../Services/util.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  stations;
  data;
  userID;
  public datalist = [
    { icon: 'man' },
    { icon: 'woman' },
    { icon: 'cash' },
    { icon: 'cafe' },
    { icon: 'fast-food' },
    { icon: 'storefront' },
    { icon: 'battery-charging' },
    { icon: 'build' },
    { icon: 'water' },
    { icon: 'add-circle' },
  ];

  constructor(
    public modalCtrl: ModalController,
    public homeService: HomeserviceService,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem('result'));
  }

  async reportPriceModalopen() {
    this.modalCtrl.dismiss();
    const reportPriceModal = await this.modalCtrl.create({
      component: PriceSheetPage,
      cssClass: 'custom-popover',
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
      backdropDismiss: true,
      showBackdrop: false,
      componentProps: {
        markerDetail: this.stations,
      },
    });
    reportPriceModal.present();
  }

  addTofavourite(item) {
    const params = {
      user_id: this.userID,
      p_station_id: item.id,
      is_favorite:
        item.is_favorite === 1
          ? (item.is_favorite = 0)
          : (item.is_favorite = 1),
    };

    this.homeService.addtofavourite(params).subscribe((res) => {
      this.stations.is_favorite = params.is_favorite ? 1 : 0;
      this.homeService.markerObservable.next(this.stations);
      if (params.is_favorite ? 1 : 0) {
        this.utilService.showToastSucccess('Add to Favorites');
        this.modalCtrl.dismiss();
      } else {
        this.utilService.showToastError('Remove from Favorites ');
        this.modalCtrl.dismiss();
      }
    });
  }
}
