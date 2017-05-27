import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { OAuthService } from '../oauth/oauth.service';
import { OAuthProfile } from '../oauth/models/oauth-profile.model';

import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OAuthService]
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

	private oauthService: OAuthService;
	profile: OAuthProfile;
  myLanguages: Array<string>;
  langForm: Object;
  chooseALang: Array<string>;
  
	constructor(oauthService: OAuthService, public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use('fr');

    this.oauthService = oauthService;
    if (localStorage.getItem('oauthToken') === null) {
      this.navCtrl.setRoot(OAuthProvidersListPage);
    }
    this.langForm = {}
    oauthService.getProfile()
      .then(profile => this.profile = profile); 
    // create a service to get languages from db
    // this.languages = []
    this.chooseALang = [
     'English',
     'French',
     'Spanish',
     'Japanese',
     'Russian',
     'German'
    ];
	}

  logForm(native, learning) {
    this.myLanguages = [native, learning];
  }
  
  logout(){
    localStorage.removeItem('oauthToken');
    this.navCtrl.setRoot(OAuthProvidersListPage);
  }
  
}
