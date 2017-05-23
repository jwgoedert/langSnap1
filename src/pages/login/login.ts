import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  message: string;
  constructor(public navCtrl: NavController) {
    this.message = "Login Page"

  }
}
