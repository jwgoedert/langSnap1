
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Nav, AlertController, NavParams, LoadingController } from 'ionic-angular';

import { MyDecksPage } from '../my-decks/my-decks';
import { FindCardPage } from '../find-card/find-card';
import { CardPage } from '../card/card';

import { TranslateService } from '@ngx-translate/core';
import { OAuthService } from '../oauth/oauth.service';
import { LanguageService } from '../../services/language.service';
import { CameraService } from '../../services/camera.service';
import { DeckService } from '../../services/deck.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { Config } from '../../config';

@IonicPage()
@Component({
  selector: 'page-edit-deck-add',
  templateUrl: 'edit-deck-add.html',
})

export class EditDeckAddPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = EditDeckAddPage;
  public photos: any;
  public base64Image: string;
  public picUrl: string;
  public profile: any;
  public fourN: any;
  public title: any;
  public translatedWord;
  public counter: number = 0;
  public deckId;
  public cards: Array<object>;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private http: Http,
    private config: Config,
    public translateService: TranslateService,
    oauthService: OAuthService,
    public languageService: LanguageService,
    public cameraService: CameraService,
    public deckService: DeckService) {
    oauthService.getProfile().toPromise()
      .then(profile => {
        console.log("params!")
        console.log(JSON.stringify(this.navParams))
        this.profile = profile;
        translateService.use(languageService.translateLang(this.profile.nativeLang));
        this.cameraService.languages(this.languageService.translateLang(this.profile.nativeLang), this.languageService.translateLang(this.profile.learnLang))
      })
      .catch(err => {
        console.log("Error" + JSON.stringify(err))
      });
    this.http = http;
    if (this.deckService.deckCreation().length > 0) {
      this.cards = this.deckService.deckCreation().reverse();

      console.log(JSON.stringify(this.cards));
    }
    this.title = this.navParams.data.deckName;
    this.deckId = this.navParams.data.deckId;
    this.deckService.deckId = this.deckId;
  }
  ngOnInit() {
    this.photos = [];
  }
  
  takePhoto() {
    if (this.title) {
      const options: CameraOptions = {
        quality: 100,
        targetWidth: 300,
        targetHeight: 300,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
      }
      this.camera.getPicture(options).then((imageData) => {
        imageData = imageData.replace(/\r?\n|\r/g, "");
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        var newForm = new FormData();
        newForm.append("file", this.base64Image);
        newForm.append("upload_preset", this.config.cloudinary.uploadPreset);
        this.photos.push({ image: this.base64Image });
        this.photos.reverse();
        return newForm;
      }).then(imgFormatted => {
        this.cameraService.sendPic(imgFormatted)
        this.cameraService.showLoading(5000);

        this.cameraService.sendPic(imgFormatted)
        setTimeout(() => {
          this.fourN = this.cameraService.getWord();
          this.cameraService.getTranslation(this.fourN)
          this.photos[this.counter]['word'] = this.fourN;
          this.deckService.addToDeckCreation(this.photos[this.counter])
          this.navCtrl.setRoot(CardPage, {findAdd:true})
        }, 3000)
      })
    } else {
      let confirm = this.alertCtrl.create({
        title: `Looks like you didn't add a deck name... You're gonna have to do that first.`,
        message: '',
        buttons: [
          {
            text: 'Oh...got it. ',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }
  }

  deletePhoto(index) {
    let confirm = this.alertCtrl.create({
      title: 'Sure you want to delete this photo?',
      message: '',
      buttons: [
        {
          text: 'No',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }

  cameraRoll() {
    if (this.title) {
      const options: CameraOptions = {
        quality: 100,
        targetWidth: 300,
        targetHeight: 300,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      }

      this.camera.getPicture(options).then((imageData) => {
        imageData = imageData.replace(/\r?\n|\r/g, "");
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        var newForm = new FormData();
        newForm.append("file", this.base64Image);
        newForm.append("upload_preset", this.config.cloudinary.uploadPreset);
        this.photos.push({ image: this.base64Image });
        this.photos.reverse();
        return newForm;
      }).then(imgFormatted => {
        this.cameraService.sendPic(imgFormatted)
        this.cameraService.showLoading(5000);

        setTimeout(() => {
          this.fourN = this.cameraService.getWord();
          this.cameraService.getTranslation(this.fourN)
          this.photos[this.counter]['word'] = this.fourN;
          this.deckService.addToDeckCreation(this.photos[this.counter])
          this.navCtrl.setRoot(CardPage, {findAdd:true})
        }, 3000)
      })
    } else {
      let confirm = this.alertCtrl.create({
        title: `Looks like you didn't add a deck name... You're gonna have to do that first.`,
        message: '',
        buttons: [
          {
            text: 'Oh...got it. ',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }
  }

  findCard() {
    if (this.title) {
      console.log('Find card click success:');
      this.navCtrl.setRoot(FindCardPage, {findAdd:true});
    } else {
      let confirm = this.alertCtrl.create({
        title: `Looks like you didn't add a deck name... You're gonna have to do that first.`,
        message: '',
        buttons: [
          {
            text: 'Oh...got it. ',
            handler: () => {
            }
          },
        ]
      });
      confirm.present();
    }
  }

  addATitle(title) {
    this.title = this.navParams.data.deckName;
    this.deckId = this.navParams.data.deckId;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateDeckPage');
  }

  click() {
    console.log('they gone think i won a grammy!!!!!!')
  }

  createDeck() {
    this.deckService.clearDeckCreation();
    this.cameraService.deleteTitle();
    this.navCtrl.setRoot(MyDecksPage);
  }

  setTranslation() {
    this.translatedWord = this.cameraService.getTranslatedWord();
    this.photos[this.counter]['translation'] = this.translatedWord;
    this.counter = this.photos.length - 1;
  }
}
