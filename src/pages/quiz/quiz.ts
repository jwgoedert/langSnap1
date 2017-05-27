import { Component, ViewChild } from '@angular/core';
import { NavController, Nav } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = QuizPage;
  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use('fr');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');
  }

}
