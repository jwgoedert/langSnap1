import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';

@Component({
  selector: 'page-find-add-deck',
  templateUrl: 'find-add-deck.html',
})
export class FindAddDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FindAddDeckPage;
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindAddDeckPage');
  }

  addDeck() {
    console.log('add deck button clicked')
    this.navCtrl.setRoot(MyDecksPage)
  }
}
