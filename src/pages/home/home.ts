import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';

import { OAuthService } from '../oauth/oauth.service';
import { OAuthProfile } from '../oauth/models/oauth-profile.model';
import { ProfileService } from '../../services/profile.service'
import { OAuthProvidersListPage } from '../oauth/list/oauth-providers.list.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [OAuthService, ProfileService]
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

	private oauthService: OAuthService;
	public profile: OAuthProfile;
  public myLanguages: Array<string>;
  public langForm: Object;
  public chooseALang: Array<string>;
  public data: any;
  private user;
  private name: string = 'Jeralnisha';
  public sor: string = 'facebook'
	constructor(oauthService: OAuthService, 
    public navCtrl: NavController, 
    public translateService: TranslateService,
    public http: Http,
    public profileService: ProfileService,
    public alertCtrl: AlertController) {
      translateService.use('fr');
      this.alertCtrl = alertCtrl;
      this.oauthService = oauthService;
      // if (localStorage.getItem('oauthToken') === null) {
      //   this.navCtrl.setRoot(OAuthProvidersListPage);
      // }
      oauthService.getProfile()
        .then(profile => {
          console.log(profile, 'profile')
          this.profile = profile
        }); 
      
      console.log(this.profile, 'profile that i am looking for')
      
	}
  
  logout(){
    localStorage.removeItem('oauthToken');
    this.navCtrl.setRoot(OAuthProvidersListPage);
  }
   button() {
    console.log('lookie im a button')
    this.http.get(`http://f377bcf8.ngrok.io/v1/users/auth/${this.sor}/${this.name}`)
      // .map(res => {
      //   console.log('inside map')
      //   res.json()
      // })
      .subscribe(data => {
        // this.user = {
        //   userName,
        //   source
        // }
        console.log('farshcafluugen')
        this.data = JSON.stringify(data);
        console.log(data, 'Data');
        var alert = this.alertCtrl.create({
          title: "Success is a hello!",
          subTitle: JSON.stringify(data),
          buttons: ["close"]
        });
        alert.present(alert);
        console.log("Success", JSON.stringify(data))
        return data;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
   }
   post() {
    let temp = {};
    
     this.http.post('http://f377bcf8.ngrok.io/v1/users/findorcreate', temp)
      .subscribe(data => {
        console.log('farshcafluugen')
        this.data = JSON.stringify(data);
        console.log(data, 'Data');
        var alert = this.alertCtrl.create({
          title: "Success is a hello!",
          subTitle: JSON.stringify(data),
          buttons: ["close"]
        });
        alert.present(alert);
        console.log("Success", JSON.stringify(data))
        return data;
      }, error => {
        console.log(JSON.stringify(error.json()));
      });
   }
}
