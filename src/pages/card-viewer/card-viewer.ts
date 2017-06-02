import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { OAuthService } from '../oauth/oauth.service';
import { DeckService } from '../../services/deck.service';

@Component({
  selector: 'page-card-viewer',
  templateUrl: 'card-viewer.html',
})
export class CardViewerPage {
  @ViewChild(Nav) nav: Nav;
  public rootPage: any = CardViewerPage;
  public profile: any;
  public deck: Array<any>;

  constructor(public navCtrl: NavController,
    public translateService: TranslateService,
    public languageService: LanguageService,
    oauthService: OAuthService,
    public deckService: DeckService, ) {
    oauthService.getProfile().toPromise()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile;
          translateService.use(languageService.translateLang(this.profile.nativeLang));
          this.deck = this.deckService.getCurrentDeck();
          console.log('this.deck')
          console.log(JSON.stringify(this.deck))
          console.log(typeof this.deck[0])
          console.log('this.deck')
        })
        .catch(err => {
          console.log("Error" + JSON.stringify(err))
        }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardViewerPage');
  }

}
