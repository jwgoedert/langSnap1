import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DeckService } from '../../services/deck.service';
import { CameraService } from '../../services/camera.service';

import { HomePage } from '../home/home'

@Component({
  selector: 'page-find-add-card-list',
  templateUrl: 'find-add-card-list.html',
})
export class FindAddCardListPage {
  public root: FindAddCardListPage;
  public cards: Array<any>;
  public deckTitle: any;
  public nativeLang: any;
  public learnLang: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private deckService: DeckService,
    private cameraService: CameraService) {
      this.nativeLang = this.navParams.get('native');
      this.learnLang = this.navParams.get('learning');

      this.cameraService.showLoading(1350);
      setTimeout(() => {
        this.cards = this.deckService.getCurrentDeck();
        this.deckTitle = this.cards[0].name;
        this.cards = this.cards[0].cards.map(card => {
          card.wordMap = JSON.parse(card.wordMap);
          return card;
        })
      }, 1350);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindAddCardListPage');
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
