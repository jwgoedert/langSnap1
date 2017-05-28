import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = ProfilePage;
  public chooseALang;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public translateService: TranslateService) {
      translateService.use('fr');
      this.chooseALang = [
        'English',
        'French',
        'Spanish',
        'Japanese',
        'Russian',
        'German'
      ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  langForm(email, native, learning) {
    console.log(email, 'lang form')
    console.log(native, 'lang form')
    console.log(learning, 'lang form')
    // pass these on to a service that sends them off to the back end
  }
}
