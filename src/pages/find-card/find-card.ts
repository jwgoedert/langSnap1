import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';
import { DeckService } from '../../services/deck.service';
import { CameraService } from '../../services/camera.service';
import { CardViewerPage } from '../card-viewer/card-viewer';
import { CreateDeckPage } from '../create-deck/create-deck';

@IonicPage()
@Component({
  selector: 'page-find-card',
  templateUrl: 'find-card.html',
})
export class FindCardPage {
  @ViewChild(Nav) nav: Nav;
  public profile: any;
  public items: any;
  public nativeLang: any;
  public learningLang: any;
  public chosenCards: Array<any>;
  public deck: any;
  public added: string;
  // public deckTitle: any;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public cameraService: CameraService,
    public deckService: DeckService) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        console.log(profile, 'profile')
        this.profile = profile;
        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.nativeLang = this.languageService.translateLang(this.profile.nativeLang);
        this.learningLang = this.languageService.translateLang(this.profile.learningLang);
        this.deck = this.deckService.getDeckId();
        // this.deckTitle = this.deck[0].name;
        this.items = this.deckService.getAllCards();
      })
      .catch(err => {
        console.log("Error" + JSON.stringify(err))
      });
    this.cameraService.showLoading(3000);
    setTimeout(() => {
      this.items = this.deckService.allCards.map((card) => {
        if ((typeof card.wordMap === 'string')) {
          card.wordMap = JSON.parse(card.wordMap);
        } 
        console.log('card in findcard unstringified') 
        console.log(card)

        return card;
      })
      this.initializeItems();
    }, 1500)

  }


  initializeItems() {
    this.chosenCards = [];
    this.items = this.deckService.allCards;
    console.log('ITEMS');
    console.log(this.items);
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;

    // console.log("target letter", val)

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)) { console.log(item.name.toLowerCase) }
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  markCard(item) {
    // console.log('THIS IS ITEM:::::::::')
    // console.log(item);
    // console.log('This is the deck!!!!!!!!!!')
    // console.log(this.deck);
    // console.log('CURRENTDECk!')
    // console.log(this.cameraService.getTitle());
    // console.log(this.deckService.getDeckId());
    console.log('Marking card:', item);
    this.chosenCards.push(item);
    // console.log("CHOSEN CARDS:")
    // console.log(this.chosenCards);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindAddDeckPage');
  }

  addCardsToCurrentDeck() {
    console.log('add deck button clicked')
    
    let addCards =
      {
        "deck_id": this.deck,
        "cardIds": this.chosenCards
      }
    
    console.log(JSON.stringify(addCards));
    console.log(this.chosenCards);
    this.deckService.postCardsToUserDeck(addCards);
    this.chosenCards = [];
    this.navCtrl.setRoot(CreateDeckPage)
  }
}