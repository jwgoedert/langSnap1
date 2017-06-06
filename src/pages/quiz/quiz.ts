import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';
import { AnswerService } from '../../services/answer.service';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = QuizPage;
  public profile: any;

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
        .then(profile => {
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.answerService.getCards(navParams.get('deck'));
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }


}
