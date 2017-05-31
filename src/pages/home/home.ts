import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';

import { OAuthService } from '../oauth/oauth.service';
import { ProfileService } from '../../services/profile.service';
import { LanguageService } from '../../services/language.service';
import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OAuthService, ProfileService, LanguageService]
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

	private oauthService: OAuthService;
	public profile: any;
  public myLanguages: Array<string>;
  public chooseALang: Array<string>;
  public user: any;

	constructor(oauthService: OAuthService, 
    public navCtrl: NavController, 
    public translateService: TranslateService,
    public http: Http,
    public profileService: ProfileService,
    public alertCtrl: AlertController,
    public languageService: LanguageService) {
      this.alertCtrl = alertCtrl;
      this.oauthService = oauthService;
      this.chooseALang = [
        'English',
        'French',
        'Spanish',
        'Japanese',
        'Russian',
        'German'
      ];
      // if (localStorage.getItem('oauthToken') === null) {
      //   this.navCtrl.setRoot(OAuthProvidersListPage);
      // }
      console.log('update 1.5')
      oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          this.user = JSON.stringify(profile);
          translateService.use(languageService.translateLang(this.profile.nativeLang));
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
	}

  langForm(email, native, learning) {
    if (!email.includes("@") || !email.length || !native || !learning){ 
      var formError = this.alertCtrl.create({
        title: "Sorry",
        subTitle: "Please check your email, native language and learning lanugages again.",
        buttons: ['close']
      });
      formError.present(formError);
    } else {
      let user = {
        "facebookUsername": this.profile.facebookUsername,
        "email": email,
        "firstName": this.profile.firstName,
        "lastName": this.profile.lastName,
        "token": JSON.stringify(JSON.parse(localStorage.getItem('oauthToken')).accessToken),
        "nativeLang": native,
        "learnLang": learning
      }
      this.profileService.updateUser(user);
      this.navCtrl.setRoot(HomePage);
    }
  }

  logout(){
    localStorage.removeItem('oauthToken');
    this.navCtrl.setRoot(OAuthProvidersListPage);
  }

}
