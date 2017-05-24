import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-create-deck',
  templateUrl: 'create-deck.html',
})
export class CreateDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateDeckPage');
  }

}
