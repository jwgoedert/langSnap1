import { OAuthProfile } from './models/oauth-profile.model';
import { Observable } from 'rxjs/Observable'

export interface IOathProvider {
	login(): Promise<string>;
	getProfile(accessToken: string): Observable<Promise<OAuthProfile>>;
}