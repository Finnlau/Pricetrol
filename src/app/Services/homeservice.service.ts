/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonAPIService } from './commonservice.service';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HomeserviceService {
  constructor(
    public http: HttpClient,
    public commonService: CommonAPIService
  ) {}

  markerObservable: Subject<string> = new BehaviorSubject<string>('');

  getpetrostation(data) {
    return this.commonService.get('/getNearByStations', data);
  }

  getmarkerstation(data) {
    return this.commonService.get('/getStationById', data);
  }

  getupdateprice(data) {
    return this.commonService.post('/update_station_price', data);
  }

  addtofavourite(data) {
    return this.commonService.post('/addRemoveFavoriteStation', data);
  }

  favouritestation(id) {
    return this.commonService.get('/getMyFavoriteStation?user_id=' + id);
  }
}
