import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';
import { DeckService } from '../../services/deck.service';

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

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public deckService: DeckService, ) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.deck = this.deckService.getCurrentDeck();
          this.deck = this.deck[0].cards
          console.log('this.deck')
          console.log(JSON.stringify(this.deck))
          console.log(typeof this.deck[0])
          console.log('this.deck')
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
    console.log('inside translations')
    this.wordsLanguages = Object.keys(JSON.parse(this.deck[0].wordMap))
    this.wordsTranslations = JSON.parse(this.deck[0].wordMap)
    
    this.word = this.wordsTranslations[this.wordsLanguages[0]];
    console.log("this.word")
    console.log(this.word)
    console.log("this.word")
  }
  swipeLeftEvent(index) {
    console.log(index, 'swiped left')
    console.log('swiped left')
    if (index < this.deck.length - 1) {
      let currentPos = index + 1

      this.wordsLanguages = Object.keys(JSON.parse(this.deck[currentPos].wordMap))
      this.wordsTranslations = JSON.parse(this.deck[currentPos].wordMap)
      
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
    }
  }
  swipeRightEvent(index) {
    console.log(index, 'swiped right')
    console.log('swiped right')
    if (index > 0) {
    let currentPos = index - 1;

    this.wordsLanguages = Object.keys(JSON.parse(this.deck[currentPos].wordMap))
    this.wordsTranslations = JSON.parse(this.deck[currentPos].wordMap)
    
    this.word = this.wordsTranslations[this.wordsLanguages[0]];
    }
  }
  flip(index) {
    console.log(index)
    console.log("index")
    console.log('flip')

    if (this.word === this.wordsTranslations[this.wordsLanguages[0]]){
    console.log('flip before 0', this.word)
      this.word = this.wordsTranslations[this.wordsLanguages[1]];
    console.log('flip after 0', this.word)
      return;
    } else if (this.word === this.wordsTranslations[this.wordsLanguages[1]]){
    console.log('flip before 1', this.word)
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
    console.log('flip after 1', this.word)
    return;
    }
  }
}
