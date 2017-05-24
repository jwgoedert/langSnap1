import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';

import { OAuthService } from '../oauth/oauth.service';
import { OAuthProfile } from '../oauth/models/oauth-profile.model';

import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';
import { MyDecksPage } from '../my-decks/my-decks';
import { FindAddDeckPage } from '../find-add-deck/find-add-deck';
import { CreateDeckPage } from '../create-deck/create-deck';

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
  myLanguages: Array<string>;
  langForm: Object;
  chooseALang: Array<string>;
  createPage;
  findAddPage;
  myDecksPage;
  
	constructor(oauthService: OAuthService, public navCtrl: NavController) {
		this.oauthService = oauthService;
    if (localStorage.getItem('oauthToken') === null) {
      this.navCtrl.setRoot(OAuthProvidersListPage);
    }
    this.createPage = CreateDeckPage
    this.findAddPage = FindAddDeckPage
    this.myDecksPage = MyDecksPage
    this.langForm = {}
    oauthService.getProfile()
      .then(profile => this.profile = profile); 
    // create a service to get languages from db
    // this.languages = []
    this.chooseALang = [
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
