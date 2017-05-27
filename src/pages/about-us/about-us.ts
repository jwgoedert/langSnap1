import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AboutUsPage;
  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use('fr');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
