import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { OAuthProvidersListPage } from './list/oauth-providers.list.page';

import { OAuthService } from '../../pages/oauth/oauth.service';

import { FacebookOauthProvider } from './facebook/facebook-oauth.provider';

@NgModule({
	imports: [IonicModule],
	declarations: [
		OAuthProvidersListPage,
	],
	entryComponents: [
		OAuthProvidersListPage,
	],
	providers: [
		OAuthService,
 		FacebookOauthProvider
	]
})
export class OAuthModule {
}
