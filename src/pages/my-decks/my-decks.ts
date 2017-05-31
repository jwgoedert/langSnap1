import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { EditDeckPage } from '../edit-deck/edit-deck';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';

@Component({
  selector: 'page-my-decks',
  templateUrl: 'my-decks.html',
})
export class MyDecksPage {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = MyDecksPage;
  public profile: any;

  constructor(public navCtrl: NavController, 
  public translateService: TranslateService,
  public languageService: LanguageService,
  oauthService: OAuthService,) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyDecksPage');
  }

  editDeck() {
    console.log('edit deck button was clicked!')
    this.navCtrl.setRoot(EditDeckPage)
  }
  
  deleteDeck() {
    console.log('delete deck button was clicked!')
  }
}
