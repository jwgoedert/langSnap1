import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-create-deck',
  templateUrl: 'create-deck.html',
})
export class CreateDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CreateDeckPage;
  constructor(public navCtrl: NavController, public translateService: TranslateService) {
      translateService.use('fr');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateDeckPage');
  }

  click() {
    console.log('they gone think i won a grammy!!!!!!')
  }
  
  createDeck() {
    this.navCtrl.setRoot(MyDecksPage)
  }
}
