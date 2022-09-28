import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(navCtrl: NavController, private route: Router) { }

  toMorePage() {
    this.route.navigate(['/more']);
  }

  ngOnInit() {
  }

}
