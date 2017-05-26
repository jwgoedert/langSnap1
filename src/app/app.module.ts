import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

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
    IonicModule.forRoot(MyApp),
    OAuthModule
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
