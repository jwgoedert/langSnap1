import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { OAuthService } from '../oauth.service';
import { OAuthProfilePage } from '../profile/oauth-profile.page';
// import { LoginPage } from '../lo/oauth-profile.model';
import { LoginPage } from '../../login/login'

@Component({
	templateUrl: 'oauth-providers.list.html',
	providers: [OAuthService]
})
export class OAuthProvidersListPage {
	@ViewChild(Nav) nav: Nav;
	private oauthService: OAuthService;
	rootPage: any = LoginPage;
	pages: Array<{title: string, component: any, icon: string}>;

	constructor(oauthService: OAuthService, public navCtrl: NavController ) {
		console.log('inside OAuthProvidersListPage')
		this.oauthService = oauthService;

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: OAuthProvidersListPage, icon: 'home' },
      { title: 'Login', component: LoginPage, icon: 'log-in' },
      { title: 'OAuth', component: OAuthProvidersListPage, icon: 'log-in' },
    ];
	}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

	public login(source: string) {

		this.oauthService.login(source)
			.then(
				(param) => {
					console.log(param, 'param');
					this.navCtrl.setRoot(OAuthProfilePage);
					console.log('look for me afterwards!!!!!!!!!!!!!!!!!!!');
				},
				error => alert(error)
			);
	}
}