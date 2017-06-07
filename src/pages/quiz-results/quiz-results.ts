import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';

@Component({
  selector: 'page-quiz-results',
  templateUrl: 'quiz-results.html',
})
export class QuizResultsPage {
  public results: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.results = navParams.get('images').map((image, index) => {
      let tempArr = navParams.get('solutions')[index]
      if (navParams.get('solutions')[0] === null) { tempArr.unshift("No Answer")}
  
      let tempObj = {
        image: image,
        results: tempArr
      }
      navParams.get('solutions')[index][0] === navParams.get('solutions')[index][1] ? tempObj['color'] = "green" : tempObj['color'] = "red"; 
      return tempObj;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizResultsPage');
  }
  done() {
    this.navCtrl.setRoot(MyDecksPage);
  }
}
