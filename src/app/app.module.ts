import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreateDeckPage } from '../pages/create-deck/create-deck';
import { FindAddDeckPage } from '../pages/find-add-deck/find-add-deck';
import { MyDecksPage } from '../pages/my-decks/my-decks';
import { AboutUsPage } from '../pages/about-us/about-us';
import { EditDeckPage } from '../pages/edit-deck/edit-deck';
import { QuizPage } from '../pages/quiz/quiz';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OAuthModule } from '../pages/oauth/oauth.module';
import { Config } from '../config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateDeckPage,
    FindAddDeckPage,
    MyDecksPage, 
    AboutUsPage,
    EditDeckPage,
    QuizPage
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
    QuizPage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}