import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-find-add-deck',
  templateUrl: 'find-add-deck.html',
})
export class FindAddDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindAddDeckPage');
  }

}
