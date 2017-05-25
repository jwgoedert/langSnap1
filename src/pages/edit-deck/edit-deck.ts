import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

@Component({
  selector: 'page-edit-deck',
  templateUrl: 'edit-deck.html',
})
export class EditDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EditDeckPage;

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDeckPage');
  }

  addCard() {
    console.log('add card button clicked')
  }

  deleteCard() {
    console.log('delete card button clicked')
  }
}
