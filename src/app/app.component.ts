import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { OAuthProvidersListPage } from '../pages/oauth/list/oauth-providers.list.page';
import { MyDecksPage } from '../pages/my-decks/my-decks';
import { FindAddDeckPage } from '../pages/find-add-deck/find-add-deck';
import { CreateDeckPage } from '../pages/create-deck/create-deck';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = OAuthProvidersListPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public translate: TranslateService) {
      this.initializeApp();

      // used for an example of ngFor and navigation
      translate.setDefaultLang('en');
      this.pages = [
        { title: 'Login', component: OAuthProvidersListPage, icon: 'log-in' },
        { title: 'Home', component: HomePage, icon: 'home' },
        { title: 'My Decks', component: MyDecksPage, icon: 'albums' },
        { title: 'Find/Add Decks', component: FindAddDeckPage, icon: 'search' },
        { title: 'Create Decks', component: CreateDeckPage, icon: 'add' },
      ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
