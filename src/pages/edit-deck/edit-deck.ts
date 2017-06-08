import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { EditDeckAddPage } from '../edit-deck-add/edit-deck-add';
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
  public deckName: string;
  public deck: any;
  public added: string;
  public addIcon: string;
  public rootPage: any = EditDeckPage;

  public nativeLang: any;
  public learnLang: any;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public cameraService: CameraService,
    public deckService: DeckService,
    public alertCtrl: AlertController) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        this.profile = profile;
        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.nativeLang = this.languageService.translateLang(this.profile.nativeLang);
        this.learnLang = this.languageService.translateLang(this.profile.learnLang);

        this.deckService.getCurrentDeck();
        this.deck = this.deckService.deckEditCards[0];
      })
      .catch(err => {
        console.log("Error" + JSON.stringify(err))
      });
    setTimeout(() => {
      this.deckName = this.deckService.deckEditCards[0].name;

      // this.deck = this.deckService.deckEditCards[0];
      this.deckName = JSON.stringify(this.deckName);
      console.log('this is DECK!!!!!')
      console.log(this.deck);
      this.items = this.deckService.deckEditCards[0].cards.map(el => {
        if (typeof el.wordMap === 'string') {
          el.wordMap = JSON.parse(el.wordMap);
        }
        return el;
      });
      this.initializeItems();
    }, 1500)
  }

  initializeItems() {
    this.chosenCards = [];
  }
  // getItems(ev) {
  //   this.initializeItems();
  //   var val = ev.target.value;
  //   if (val && val.trim() != '') {
  //     this.items = this.items.filter((item) => {
  //       if ((item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)) { console.log(item.name.toLowerCase) }
  //       return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditDeckPage');

  }

  addCard() {
    console.log('add card button clicked')
    console.log(JSON.stringify(this.items));
    console.log(typeof this.items)
    this.navCtrl.setRoot(EditDeckAddPage, {deckId:this.deck.id, deckName:this.deckName});
  }
  removeCardFromUserDeck(itemId) {
    console.log('itemIDDDDDD')
    console.log(itemId);
    let confirm = this.alertCtrl.create({
      title: `Sure you want to delete this Card?`,
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log("Okay, we'll delete")
            console.log(itemId)
            this.deckService.deleteCardFromUserDeck(this.profile.id, this.deck.id, itemId, );
            this.deckService.deckEditCards = this.deckService.getAllCardsInADeck(this.deck.id);
            setTimeout(()=>{
            console.log(this.deckService.deckEditCards = this.deckService.getAllCardsInADeck(this.deck.id));
              
            this.navCtrl.setRoot(EditDeckPage)

          },1700)
          this.cameraService.showLoading(1700);
          }
        }
      ]
    });
    confirm.present();



  }

  deleteCard() {
    console.log('delete card button clicked')
  }
}
