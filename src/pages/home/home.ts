import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav } from 'ionic-angular';

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

  rootPage: any = OAuthProvidersListPage;

	private oauthService: OAuthService;
	profile: OAuthProfile;


	constructor(oauthService: OAuthService, public navCtrl: NavController) {
		this.oauthService = oauthService;
    if (localStorage.getItem('oauthToken') === null) {
      this.navCtrl.setRoot(OAuthProvidersListPage);
    } else {
      oauthService.getProfile()
        .then(profile => this.profile = profile);
    }
	}

  logout(){
    localStorage.removeItem('oauthToken');
    this.navCtrl.setRoot(OAuthProvidersListPage);
  }
}
