import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';
import { DeckService } from '../../services/deck.service';
import { CameraService } from '../../services/camera.service';

@IonicPage()
@Component({
  selector: 'page-edit-deck',
  templateUrl: 'edit-deck.html',
})
export class EditDeckPage {
  @ViewChild(Nav) nav: Nav;
  public profile: any;
  public items: any;
  public chosenCards: Array<any>;
  public deck: any;
  public added: string;
  public addIcon: string;
  public rootPage: any = EditDeckPage;

  public nativeLang: any;
  public learningLang: any;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public cameraService: CameraService,
    public deckService: DeckService) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        this.profile = profile;
        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.deck = this.deckService.getDeckId();
        this.items = this.deckService.getAllCards();
        this.addIcon = "checkmark-circle-outline";

        // this.nativeLang = this.languageService.translateLang(this.profile.nativeLang);
        // this.learningLang = this.languageService.translateLang(this.profile.learningLang);
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
    // console.log('ITEMS');
    // console.log(this.items);
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
