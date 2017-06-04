import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController } from 'ionic-angular';
import { QuizPage } from '../quiz/quiz';

@Component({
  selector: 'page-phrase-modal',
  templateUrl: 'phrase-modal.html',

})
export class PhraseModalPage {
  public rootPage: any = PhraseModalPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log('UserId', navParams.get('userId'));
    console.log(navParams.get('userId'));
    console.log('UserId', navParams.get('userId'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhraseModalPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  takeAQuiz() {
    this.navCtrl.setRoot(QuizPage)
  }
}
