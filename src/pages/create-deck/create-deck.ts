import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, AlertController } from 'ionic-angular';
import { MyDecksPage } from '../my-decks/my-decks';
import { TranslateService } from '@ngx-translate/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http } from '@angular/http';
import { Config } from '../../config';
// @Injectable() ???
@Component({
  selector: 'page-create-deck',
  templateUrl: 'create-deck.html',
})
export class CreateDeckPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CreateDeckPage;
      
  public photos: any;
  public base64Image: string;


 
    constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private http: Http,
    private config: Config,
    public translateService: TranslateService,
  ) {
    translateService.use('fr');
    this.http = http;
  }
  ngOnInit() {
    this.photos = [];
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    console.log("TOTOPHOTO");
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:  
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      console.log('What is this?', this.base64Image);
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      // Handle error
    });
  }
  deletePhoto(index) {
    // this.photos.splice(index, 1);
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


    ionViewDidLoad() {
      console.log('ionViewDidLoad CreateDeckPage');
    }

    click() {
      console.log('they gone think i won a grammy!!!!!!')
    }
  
  createDeck() {
    this.navCtrl.setRoot(MyDecksPage)
  }
}

