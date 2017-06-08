import { Component } from '@angular/core';
import { NavController, NavParams,  ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';
import { PhraseService } from '../../services/phrase.service';
import { CameraService } from '../../services/camera.service';

@Component({
  selector: 'page-phrase-modal',
  templateUrl: 'phrase-modal.html',

})
export class PhraseModalPage {
  public rootPage: any = PhraseModalPage;
  private profile: any;
  private phrase: string;
  private sentence: string;

  constructor(public navCtrl: NavController, 
  public navParams: NavParams, 
  public viewCtrl: ViewController,
  private oauthService: OAuthService,
  private translateService: TranslateService,
  private languageService: LanguageService,
  private phraseService: PhraseService,
  private cameraService: CameraService) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        console.log(profile, 'profile')
        this.profile = profile;
        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.phraseService.setTargetTrasnlationLang(languageService.translateLang(this.profile.nativeLang), languageService.translateLang(this.profile.learnLang))
        this.phraseService.getPhrase(navParams.get('word'));
      })
      .catch(err => {
        console.log("Error" + JSON.stringify(err))
      });
      this.cameraService.showLoading(3000)
      setTimeout(() => {
        this.getPhrases();
      }, 3000)
  }
  getPhrases() {
    this.phrase = this.phraseService.translatedPhrase || "Sorry Phrase is not available. Try again later.";
    this.sentence = this.phraseService.nativeSentence;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PhraseModalPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
