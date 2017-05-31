import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = AboutUsPage;
  public profile: any;

  constructor(public navCtrl: NavController, 
  public translateService: TranslateService,
  oauthService: OAuthService,
  public languageService: LanguageService) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
