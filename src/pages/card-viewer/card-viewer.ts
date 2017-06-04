import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';
import { DeckService } from '../../services/deck.service';
import { PhraseModalPage } from '../phrase-modal/phrase-modal';
@Component({
  selector: 'page-card-viewer',
  templateUrl: 'card-viewer.html',
})
export class CardViewerPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = CardViewerPage;
  public profile: any;
  public deck: Array<any>;
  public word: any;
  public wordsLanguages: any;
  public wordsTranslations: any;
  public deckTitle: any;
  public deckLanguage: any;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public deckService: DeckService, 
    public modalCtrl: ModalController) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.deck = this.deckService.getCurrentDeck();
          this.deckTitle = this.deck[0].name
          this.deck = this.deck[0].cards
          console.log("this.deck")
          console.log(JSON.stringify(this.deck))
          console.log("this.deck")
          if (!JSON.parse(this.deck[0].wordMap)["sorry"]) {
            this.deckLanguage = this.profile.learnLang;
          }
          this.translations();
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardViewerPage');
  }
  translations() {
    this.wordsLanguages = [this.languageService.translateLang(this.profile.nativeLang), this.languageService.translateLang(this.profile.learnLang)];
    console.log("this.wordsLanguages")
    console.log(JSON.stringify(this.wordsLanguages))
    console.log("this.wordsLanguages")
    this.wordsTranslations = JSON.parse(this.deck[0].wordMap);
    console.log("this.wordsTranslations")
    console.log(JSON.stringify(this.wordsTranslations))
    console.log("this.wordsTranslations")
    if (this.wordsTranslations['sorry']) {
      this.wordsLanguages = ['sorry', 'reallSorry'];
    }
    this.word = this.wordsTranslations[this.wordsLanguages[0]];
    console.log("this.word")
    console.log(this.word)
    console.log("this.word")
  }
  swipeLeftEvent(index) {
    if (index < this.deck.length - 1) {
      let currentPos = index + 1

      this.wordsTranslations = JSON.parse(this.deck[currentPos].wordMap)
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
    }
  }
  swipeRightEvent(index) {
    if (index > 0) {
      let currentPos = index - 1;

      this.wordsTranslations = JSON.parse(this.deck[currentPos].wordMap)
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
    }
  }
  flip(index) {
    if (this.word === this.wordsTranslations[this.wordsLanguages[0]]){
      this.word = this.wordsTranslations[this.wordsLanguages[1]];
      return;
    } else if (this.word === this.wordsTranslations[this.wordsLanguages[1]]){
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
      return;
    }
  }
  presentPhraseModal() {
   let profileModal = this.modalCtrl.create(PhraseModalPage, { userId: 8675309 });
   profileModal.present();
 }
}
