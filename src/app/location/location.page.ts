/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MAP_STYLES } from '../models/map.model';
import { ModalPage } from '../modal/modal.page';
import { HomeserviceService } from '../Services/homeservice.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UtilService } from '../Services/util.service';
declare const google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {
  @ViewChild('mapElement') mapElement: ElementRef;
  result;
  userID: any;
  station;
  ismodal: any;
  stations: any;
  googleMap: any;
  latitude: number;
  longitude: number;
  // lat: number;
  // lng: number;
  myLatlng: null;
  markerlist: any = [];
  search: any;
  isListView = false;
  data: any = [];
  currentlocation: any;
  constructor(
    public modalCtrl: ModalController,
    public route: Router,
    public homeService: HomeserviceService,
    public utilService: UtilService
  ) {}

  ngOnInit() {
    this.userID = JSON.parse(localStorage.getItem('result'));
    this.homeService.markerObservable.subscribe((res: any) => {
      if (res) {
        const i = this.stations?.findIndex((x) => x.id === res.id);
        this.stations[i].is_favorite = res.is_favorite;
      }
    });
  }
  ionViewDidEnter() {
    this.getLocation();
  }

  initMap() {
    const myLatlng = new google.maps.LatLng(53.3461724, -6.2754237);

    if (!this.googleMap) {
      this.googleMap = new google.maps.Map(
        document.getElementById('mapElement'),
        {
          mapTypeControl: false,
          streetViewControl: false,
          zoom: 13,
          center: myLatlng,
          styles: MAP_STYLES,
        }
      );
      this.getPetroCels();

      google.maps.event.addListener(this.googleMap, 'dragend', () => {
        this.myLatlng = this.googleMap.getCenter();
        this.latitude = this.googleMap.getCenter().lat();
        this.longitude = this.googleMap.getCenter().lng();
        this.getPetroCels();
      });
    }
  }

  getPetroCels() {
    const params: any = {
      user_id: this.userID,
      latitude: this.latitude,
      longitude: this.longitude,
      searchKeyword: this.search,
    };
    this.homeService.getpetrostation(params).subscribe((res) => {
      this.stations = res.data;
      this.removeMarker();
      this.markerlist = [];
      this.setMarker();
    });
  }

  removeMarker() {
    this.markerlist.forEach((marker) => {
      marker.setMap(null);
    });
  }

  setMarker() {
    this.currentlocation = new google.maps.Marker({
      map: this.googleMap,
      label: {
        text: this.stations[0]?.city,
        fontSize: '10px',
        fontWeight: 'bold',
        color: '#000000',
      },
      position: {
        lat: 53.275373674900955,
        lng: -7.492424274207613,
      },
    });
    this.stations.forEach((station) => {
      const marker = new google.maps.Marker({
        map: this.googleMap,
        icon: 'assets/icon/custom_marker.png',
        label: {
          text: 'P :' + station.price + ',' + 'D :' + station.d_price,
          fontSize: '10px',
          fontWeight: 'bold',
          color: '#ffffff',
        },
        position: {
          lat: Number(station.latitude),
          lng: Number(station.longitude),
        },
        customInfo: station,
      });
      this.markerlist.push(marker);

      marker.addListener('click', () => {
        const params = {
          id: station.id,
          user_id: this.userID,
        };
        this.homeService.getmarkerstation(params).subscribe(async (res) => {
          this.ismodal = await this.modalCtrl.create({
            component: ModalPage,
            componentProps: {
              stations: res.data,
            },
            breakpoints: [0, 0.5],
            initialBreakpoint: 0.5,
            backdropDismiss: true,
            showBackdrop: false,
            cssClass: 'modal-class',
          });
          this.ismodal.present();
        });
      });
    });
  }

  getLocation() {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position && position.coords) {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          } else {
            this.latitude = 53.275373674900955;
            this.longitude = -7.492424274207613;
          }
          this.initMap();
        },
        (err) => {
          console.log(err);
        },
        options
      );
    } else {
      console.log('The location is not supported by this browser.');
    }
  }

  // getLocation() {
  //   if (navigator.geolocation) {
  //     const options = {
  //       enableHighAccuracy: true,
  //       timeout: 10000,
  //       maximumAge: 0,
  //     };

  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         if (position && position.coords) {
  //           this.latitude = position.coords.latitude
  //             ? position.coords.latitude
  //             : 53.143108493423306;
  //           this.longitude = position.coords.longitude
  //             ? position.coords.longitude
  //             : -7.692207167023654;
  //         } else {
  //           this.latitude = 53.275373674900955;
  //           this.longitude = -7.492424274207613;
  //         }
  //         this.initMap();
  //       },
  //       (err) => {
  //         console.log(err);
  //       },
  //       options
  //     );
  //   } else {
  //     console.log('The location is not supported by this browser.');
  //   }
  // }

  currentPos(_arg0: string, _currentPos: any) {
    throw new Error('Method not implemented.');
  }

  onsearch(e) {
    this.search = e.target.value;
    this.getPetroCels();
  }

  addtofav(station) {
    const params = {
      user_id: this.userID,
      p_station_id: station.id,
      is_favorite:
        station.is_favorite === 1
          ? (station.is_favorite = 0)
          : (station.is_favorite = 1),
    };
    this.homeService.addtofavourite(params).subscribe((res) => {
      this.stations.is_favorite = params.is_favorite ? 1 : 0;
      if (params.is_favorite ? 1 : 0) {
        this.utilService.showToastSucccess('Add to Favorites');
      } else {
        this.utilService.showToastError('Remove from Favorites ');
      }
    });
  }
}
