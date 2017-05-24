import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-my-decks',
  templateUrl: 'my-decks.html',
})
export class MyDecksPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDecksPage');
  }

}
