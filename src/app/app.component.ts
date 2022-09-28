import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  result;
  constructor() {
    this.result = localStorage.getItem('result');
    if (!this.result) {
      this.randomString(2);
    }
  }

  randomString(length) {
      const randomChars = '01234567891234';
      this.result = '';
      for (let i = 0; i < length; i++) {
        this.result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      localStorage.setItem('result', this.result);

      return this.result;
  }
}
