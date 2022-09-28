/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FavouriteModalPage } from '../favourite-modal/favourite-modal.page';
import { HomeserviceService } from '../Services/homeservice.service';
import { UtilService } from '../Services/util.service';
@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  userID;
  isFavorite = false;
  favlist;
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

  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  profileImage: string;
  constructor(
    private route: Router,
    private modalCtrl: ModalController,
    public homeService: HomeserviceService,
    public utilService: UtilService
  ) {}

  toMorePage() {
    this.route.navigate(['/more']);
  }

  ionViewDidEnter() {
    this.getfavourite();
  }

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem('result'));
  }

  getfavourite() {
    this.homeService.favouritestation(this.userID).subscribe((res) => {
      this.favlist = res.data;
    });
  }

  async actionSheet(data) {
    const actionSheet = await this.modalCtrl.create({
      component: FavouriteModalPage,
      cssClass: 'custom-popover',
      breakpoints: [0, 0.7],
      initialBreakpoint: 0.7,
      backdropDismiss: true,
      showBackdrop: false,
      componentProps: {
        reportdetail: data,
      },
    });
    actionSheet.present();
  }

  removeFavorite(item, index) {
    const params = {
      user_id: this.userID,
      p_station_id: item.p_station_id,
      is_favorite:
        item.is_favorite === 1
          ? (item.is_favorite = 0)
          : (item.is_favorite = 1),
    };

    const faData: any = {
      id: item.p_station_id,
      is_favorite: item.is_favorite,
    };
    this.homeService.markerObservable.next(faData);
    this.homeService.addtofavourite(params).subscribe((res) => {
      this.favlist.is_favorite = params.is_favorite ? 1 : 0;
      if (params.is_favorite ? 0 : 1) {
        this.favlist.splice(index, 1);
        this.getfavourite();
        this.utilService.showToastError('Remove from Favorites ');
      }
    });
  }
}
