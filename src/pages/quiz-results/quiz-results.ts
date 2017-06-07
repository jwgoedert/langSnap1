import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

@Component({
  selector: 'page-quiz-results',
  templateUrl: 'quiz-results.html',
})
export class QuizResultsPage {
  public results: Array<any> = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    private screenshot: Screenshot,
    public platform: Platform) {
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
  facebookShare() {
    this.platform.ready().then(() => {
      this.screenshot.URI(80)
        .then((res) => {
            console.log(res);
            this.socialSharing.shareViaFacebook(null, res.URI, null)
              .then(() => {},
                () => {
                  alert('SocialSharing failed');
                });
          },
          () => {
            alert('Screenshot failed');
          });
    });
  }

  done() {
    this.navCtrl.setRoot(MyDecksPage);
  }
}
