import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
})
export class MorePage implements OnInit {

  constructor(navCtrl: NavController, private route: Router) { }

  toMapPage() {
    this.route.navigate(['/location']);
  }

  toFavouritePage() {
    this.route.navigate(['/favourite']);
  }

  toProfilePage() {
    this.route.navigate(['/profile']);
  }

  toSettingsPage() {
    this.route.navigate(['/settings']);
  }

  toContactusPage() {
    this.route.navigate(['/contact-us']);
  }

  toTermsConditionsPage() {
    this.route.navigate(['/terms-and-conditions']);
  }

  ngOnInit() {
  }

}
