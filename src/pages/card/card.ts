import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CameraService } from '../../services/camera.service';
import { CreateDeckPage } from '../create-deck/create-deck';
// import { TranslateService } from '@ngx-translate/core';
// import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {
  public title: string;
  public cardInfo: any;
  public translation: any;
  public rootPage: any = CardPage;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public cameraService: CameraService) {
    this.cardInfo = this.cameraService.getCardInfo();
    console.log('v 1.1')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }
  translate(){
    this.cameraService.getTranslation(this.cardInfo.word)
    setTimeout(() => {
      this.setTranslation();
    }, 1500)
  }
  setTranslation() {
    this.translation = this.cameraService.getTranslatedWord();
  }
  editWord(){
    // sends word to translation api
  }
  createCard() {
    this.navCtrl.setRoot(CreateDeckPage)
  }
}
