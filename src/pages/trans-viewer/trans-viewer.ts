import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { CameraService } from '../../services/camera.service';
import { CreateDeckPage } from '../create-deck/create-deck';
import { LanguageService } from '../../services/language.service';
import { DeckService } from '../../services/deck.service';
import { OAuthService } from '../oauth/oauth.service';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Screenshot } from '@ionic-native/screenshot';

@Component({
  selector: 'page-trans-viewer',
  templateUrl: 'trans-viewer.html',
})
export class TransViewerPage {
  // public cardInfo: any;
  public translation: any;
  public profile: any;
  public rootPage: any = TransViewerPage;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public cameraService: CameraService,
    private oauthService: OAuthService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    // private deckService: DeckService,
    private socialSharing: SocialSharing,
    private screenshot: Screenshot,
    public platform: Platform) {
      oauthService.getProfile().toPromise()
        .then(profile => {
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.cameraService.languages(this.languageService.translateLang(this.profile.nativeLang), this.languageService.translateLang(this.profile.learnLang))
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        });
      // this.cardInfo = this.cameraService.getCardInfo();
      this.getTranslation();
  }
  getTranslation() {
    setTimeout(() => {
      this.translation = this.cameraService.getTranslatedWord();
    }, 1500)
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
}
