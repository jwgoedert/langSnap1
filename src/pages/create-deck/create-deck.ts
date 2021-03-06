import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController, LoadingController } from 'ionic-angular';

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

@Component({
  selector: 'page-create-deck',
  templateUrl: 'create-deck.html',
})
export class CreateDeckPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = CreateDeckPage;
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
    if (this.cameraService.getTitle()) {
      this.title = this.cameraService.getTitle();
    }
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
          this.navCtrl.setRoot(CardPage)
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
          this.navCtrl.setRoot(CardPage)
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

  checkTitle() {
    if (this.title) {
      this.navCtrl.setRoot(CardPage)
    } else {
      var formError = this.alertCtrl.create({
        title: `Looks like you didn't add a deck name... You're gonna have to do that first.`,
        message: '',        
        buttons: ['Oh...got it.']
      });
      formError.present(formError);
    }
  }

  findCard() {
    if (this.title) {
      console.log('Find card click success:');
      this.navCtrl.setRoot(FindCardPage);
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
    this.title = title;
    this.cameraService.addTitle(this.title)
    this.deckId = this.deckService.postUserDeck(this.title, this.profile.id)

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
