import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';
import { DeckService } from '../../services/deck.service';
import { AnswerService } from '../../services/answer.service';
import { PhraseModalPage } from '../phrase-modal/phrase-modal';
import { QuizPage } from '../quiz/quiz';
import { FontAwesome } from 'font-awesome';

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
  public deckId: number;
  public deckTitle: string;
  public deckLanguage: any;
  public index: number;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    private oauthService: OAuthService,
    public deckService: DeckService, 
    public modalCtrl: ModalController, 
    private answerService: AnswerService) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.deck = this.deckService.getCurrentDeck();
          this.deckId = this.deck[0].id;
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
    this.index = 0;
    console.log("this.word")
    console.log(this.word)
    console.log("this.word")
  }
  swipeLeftEvent(index) {
    if (index < this.deck.length - 1) {
      let currentPos = index + 1
      this.index += 1;
      this.wordsTranslations = JSON.parse(this.deck[currentPos].wordMap)
      this.word = this.wordsTranslations[this.wordsLanguages[0]];
    }
  }
  swipeRightEvent(index) {
    if (index > 0) {
      let currentPos = index - 1;
      this.index -= 1;
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
  thumbsUp() {
    this.answerService.cardAnswer(this.deckId, this.deck[this.index].id, 'good')
  }
  thumbsMiddle() {
    this.answerService.cardAnswer(this.deckId, this.deck[this.index].id, 'ok')
  }
  thumbsDown() {
    this.answerService.cardAnswer(this.deckId, this.deck[this.index].id, 'bad')
  }
  presentPhraseModal() {
   let profileModal = this.modalCtrl.create(PhraseModalPage, { word:  JSON.parse(this.deck[this.index].wordMap)['en']});
   profileModal.present();
 }
  takeAQuiz() {
    this.navCtrl.setRoot(QuizPage, { deck: this.deckId})
  }
}
