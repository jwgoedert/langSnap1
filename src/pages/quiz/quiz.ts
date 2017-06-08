import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams, Slides  } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';
import { AnswerService } from '../../services/answer.service';

import { QuizResultsPage } from '../quiz-results/quiz-results';
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(Slides) slides: Slides;

  public rootPage: any = QuizPage;
  public profile: any;
  public cards: Array<any>;
  public answerChoiceArray: Array<string>;
  public index: number = 0;
  private quizChoiceArray: Array<any>;
  private solutionsArray: Array<any>;
  private userAnswersArray: Array<number> = [];
  public cardAnswer: any; 

  constructor(public navCtrl: NavController, 
  public translateService: TranslateService,
  oauthService: OAuthService,
  public languageService: LanguageService,
  public navParams: NavParams,
  private answerService: AnswerService) {
    console.log("navParams.get('deck')");
    console.log(navParams.get('deck'));
    console.log("navParams.get('deck')");
    oauthService.getProfile().toPromise()
        .then( profile => {
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.answerService.setLearnLang(languageService.translateLang(this.profile.learnLang))
          this.answerService.getCards(navParams.get('deck'));
          this.getQuizInfo();
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

  getQuizInfo() {
    setTimeout(() => {
      this.cards = this.answerService.deck;
      console.log("this.cards")
      console.log(JSON.stringify(this.cards))
      console.log(JSON.stringify(this.cards.length))
      console.log("this.cards")
      this.answerChoiceArray = this.answerService.answerChoices;
      // console.log("this.answerChoiceArray")
      // console.log(JSON.stringify(this.answerChoiceArray))
      // console.log("this.answerChoiceArray")
      this.answerService.clearChoiceArray();
      this.makeQuizChoiceArray();
    }, 500);
  }

  swipeLeftEvent(index) {
    if (index < this.cards.length - 1) {
      let currentPos = index + 1
    }
    this.index += 1;
  }
  swipeRightEvent(index) {
    if (index > 0) {
      let currentPos = index - 1;
    }
    this.index -= 1;
  }

  slideChanged() {
    this.slides.lockSwipeToPrev(true);
  }
  chooseAnswer(choice, pos){
    if(!Number(pos)){
      pos = 0;
    }
    if(this.quizChoiceArray[this.slides.getActiveIndex()][pos]['status'].length){
      this.quizChoiceArray[this.slides.getActiveIndex()][pos]['status'] = "";
    }
    else{
      this.quizChoiceArray[this.slides.getActiveIndex()][pos]['status'] = "checkmark-circle";
    }
    if(this.solutionsArray[this.slides.getActiveIndex()].length !== 2) {
      this.solutionsArray[this.slides.getActiveIndex()].unshift(choice.word);
    } else {
      this.solutionsArray[this.slides.getActiveIndex()].shift()
      this.solutionsArray[this.slides.getActiveIndex()].unshift(choice.word);
    }
  
    if (this.slides.getActiveIndex() === this.cards.length - 1) {
      this.compareAnswers();
    }
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  compareAnswers() {
    let images = [];
    this.cards.forEach((card) => {
      images.push(card.imgUrl)
    })
    this.navCtrl.setRoot(QuizResultsPage, {images: images, solutions: this.solutionsArray})
  }

  makeQuizChoiceArray() {
    this.quizChoiceArray = [];
    this.solutionsArray = [];
    this.cards.forEach((card) => {
      let holderArr = [undefined, undefined, undefined, undefined];
      let randomIndex = Math.floor(Math.random() * 4);
      let solution = JSON.parse(card.wordMap)[this.languageService.translateLang(this.profile.learnLang)];
      this.answerChoiceArray.sort(() => 0.5 - Math.random())
      
      holderArr[randomIndex] = solution;

      for (let i = 0; i < holderArr.length; i++) {
        if (!holderArr[i] && holderArr.indexOf(this.answerChoiceArray[i]) === - 1) {
          holderArr[i] = this.answerChoiceArray[i];
        }
      }
      holderArr = holderArr.map(el=>{
        el =  {
          word: el,
          status: ''
        }
        return el;
      })
      this.solutionsArray.push([solution]);
      this.quizChoiceArray.push(holderArr);
    })
  }
}
