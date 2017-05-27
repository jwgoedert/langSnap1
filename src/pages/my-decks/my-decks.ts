import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { EditDeckPage } from '../edit-deck/edit-deck';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-my-decks',
  templateUrl: 'my-decks.html',
})
export class MyDecksPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MyDecksPage;

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use('fr');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDecksPage');
  }

  editDeck() {
    console.log('edit deck button was clicked!')
    this.navCtrl.setRoot(EditDeckPage)
  }
  
  deleteDeck() {
    console.log('delete deck button was clicked!')
  }
}
