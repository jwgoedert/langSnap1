import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, NavParams } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { EditDeckAddPage } from '../edit-deck-add/edit-deck-add';
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
  public learnLang: any;
  public chosenCards: Array<any>;
  public deck: Array<any>;
  public added: string;
  public addIcon: string;
  public deckTitle: string;
  public displayCards: Array<any> = [];

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public cameraService: CameraService,
    public deckService: DeckService) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        console.log(profile, 'profile')
        this.profile = profile;
        console.log('Params in findCards');
        console.log(JSON.stringify(this.navParams));

        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.nativeLang = this.languageService.translateLang(this.profile.nativeLang);
        // this.learningLang = this.languageService.translateLang(this.profile.learnLang);
        this.learnLang = this.languageService.translateLang(this.profile.learnLang);
        this.deck = this.deckService.getDeckId();
        this.deckTitle = this.cameraService.getTitle();
        this.items = this.deckService.getAllCards();
        this.addIcon = "checkmark-circle-outline";
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
        card['status'] = '';
        // console.log('card in findcard unstringified') 
        // console.log(card)
        return card;
      })
      this.initializeItems();
    }, 1500)

  }


  initializeItems() {
    this.chosenCards = [];
    this.items = this.deckService.allCards;
  }
  getItems(ev) {
    // Reset items back to all of the items
    this.initializeItems();
    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        if (item.wordMap[this.nativeLang] && (item.wordMap[this.nativeLang].toLowerCase().indexOf(val.toLowerCase()) > -1)) { 
          console.log(item.wordMap[this.nativeLang].toLowerCase) 
          return (item.wordMap[this.nativeLang].toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
        // this will work once the database is re emptied above conditional works for npw
        // return (item.wordMap[this.nativeLang].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  markCard(item, index) {
    let pos = this.chosenCards.indexOf(item);
    if (this.chosenCards.indexOf(item) === -1) {
      this.items[index].status = "checkmark-circle";
      this.chosenCards.push(item);
      this.displayCards.push(index);
    } else if(pos !== -1){
      this.items[index].status = "";
      this.chosenCards[pos] = -1;
      this.displayCards[pos] = -1;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FindAddDeckPage');
  }

  addCardsToCurrentDeck() {
    this.chosenCards = this.chosenCards.filter(el=> el !== -1);
    this.displayCards = this.displayCards.filter(el=> el !== -1);
   
    let addCards =
      {
        "deck_id": this.deck,
        "cardIds": this.chosenCards
      }
    this.displayCards.forEach(card => {
      let cardInfo = {
        "word":  this.items[card].wordMap.en,
        "image": this.items[card].imgUrl
      }
      this.deckService.addToDeckCreation(cardInfo) 
    })
 
    this.deckService.postCardsToUserDeck(addCards);
    this.chosenCards = [];
    setTimeout(() => {
       if(this.navParams.data.findAdd === true){
      this.navCtrl.setRoot(EditDeckAddPage);
      } else {
      this.navCtrl.setRoot(CreateDeckPage);
      }
    }, 1500)
  }
}