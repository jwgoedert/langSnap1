import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-edit-deck',
  templateUrl: 'edit-deck.html',
})
export class EditDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EditDeckPage;

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use('fr');
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
