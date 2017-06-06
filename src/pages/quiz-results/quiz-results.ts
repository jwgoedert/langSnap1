import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-quiz-results',
  templateUrl: 'quiz-results.html',
})
export class QuizResultsPage {
  public results: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("navParams.get('images')");
    console.log(JSON.stringify(navParams.get('images')));
    console.log("navParams.get('images')");
    console.log("navParams.get('solutions')");
    console.log(JSON.stringify(navParams.get('solutions')));
    console.log("navParams.get('solutions')");
    
    this.results = navParams.get('images').map((image, index) => {
      let tempObj = {
        image: image,
        results: navParams.get('solutions')[index]
      }
      if (!navParams.get('solutions')[index][0] || navParams.get('solutions')[index][0] === null) { navParams.get('solutions')[index][0] = "No Answer"}
      navParams.get('solutions')[index][0] === navParams.get('solutions')[index][1] ? tempObj['color'] = "green" : tempObj['color'] = "red"; 
      return tempObj;
    })
    console.log("this.results");
    console.log(JSON.stringify(this.results));
    console.log("this.results");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizResultsPage');
  }

}
