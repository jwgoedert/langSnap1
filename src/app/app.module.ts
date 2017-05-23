import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { OAuthProvidersListPage } from '../pages/oauth/list/oauth-providers.list.page';

import { OAuthModule } from '../pages/oauth/oauth.module';
import { Config } from '../config';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    // OAuthProvidersListPage
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
    LoginPage,
    // OAuthProvidersListPage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
