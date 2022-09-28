import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(navCtrl: NavController, private route: Router) { }

  toMorePage() {
    this.route.navigate(['/more']);
  }

  ngOnInit() {
  }

}
