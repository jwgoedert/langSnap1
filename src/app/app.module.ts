import { MyApp } from './app.component';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Camera } from '@ionic-native/camera'; 
import { OAuthModule } from '../pages/oauth/oauth.module';
import { Config } from '../config';

import { HomePage } from '../pages/home/home';
import { CardPage } from '../pages/card/card';
import { CreateDeckPage } from '../pages/create-deck/create-deck';
import { FindAddDeckPage } from '../pages/find-add-deck/find-add-deck';
import { MyDecksPage } from '../pages/my-decks/my-decks';
import { CardViewerPage } from '../pages/card-viewer/card-viewer';
import { AboutUsPage } from '../pages/about-us/about-us';
import { EditDeckPage } from '../pages/edit-deck/edit-deck';
import { QuizPage } from '../pages/quiz/quiz';
import { ProfilePage } from '../pages/profile/profile';
import { PhraseModalPage } from '../pages/phrase-modal/phrase-modal';

import { LanguageService } from '../services/language.service';
import { CameraService } from '../services/camera.service';
import { DeckService } from '../services/deck.service';
import { PhraseService } from '../services/phrase.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateDeckPage,
    FindAddDeckPage,
    MyDecksPage, 
    AboutUsPage,
    EditDeckPage,
    QuizPage,
    ProfilePage,
    CardPage,
    CardViewerPage,
    PhraseModalPage
  ],
  imports: [
    BrowserModule,
		HttpModule,
    OAuthModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateDeckPage,
    FindAddDeckPage,
    MyDecksPage,
    AboutUsPage,
    EditDeckPage,
    QuizPage,
    ProfilePage,
    CardPage,
    CardViewerPage,
    PhraseModalPage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    Camera,
    LanguageService,
    CameraService,
    DeckService,
    PhraseService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}