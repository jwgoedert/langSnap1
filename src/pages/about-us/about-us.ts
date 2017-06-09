import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Slides } from 'ionic-angular';

/**
 * Generated class for the AboutUsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  @ViewChild(Nav) nav: Nav;
   @ViewChild(Slides) slides: Slides;
   backimg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.backimg = "http://www.iexpats.com/wp-content/uploads/2016/06/foreign-flags.jpg";
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
