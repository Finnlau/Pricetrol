import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(navCtrl: NavController, private route: Router) { }

  toMorePage() {
    this.route.navigate(['/more']);
  }

  ngOnInit() {
  }

}
