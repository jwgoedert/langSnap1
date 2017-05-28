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
  public picUrl: string;

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
      quality: 100,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
    }
    console.log("TOTOPHOTO");
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:  
      imageData = imageData.replace(/\r?\n|\r/g, "");
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      var newForm = new FormData();
      newForm.append("file", this.base64Image);
      newForm.append("upload_preset", this.config.cloudinary.uploadPreset);
      this.http.post(`https://api.cloudinary.com/v1_1/${this.config.cloudinary.cloudId}/image/upload`, newForm)
        .subscribe(info => {
          this.picUrl = info.url;
          // alert for response
          // var alert = this.alertCtrl.create({
          //   title: "Data String",
          //   subTitle: JSON.stringify(info),
          //   buttons: ["close"]

          // });
          // alert.present(alert);
          console.log(JSON.stringify(info));
        }, error => {
          var alertErr = this.alertCtrl.create({
            title: "ERROR",
            subTitle: JSON.stringify(error.json().error),
            buttons: ["close"]
          });
          alertErr.present(alertErr);
        });
      //put photos in grid for viewing  
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      // Handle error
      console.log(err);
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
// not currently working, need to troubleshoot
    cameraRoll() {
    const options: CameraOptions = {
      quality: 100,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    console.log("TOTOPHOTO");
    this.camera.getPicture(options).then((imageData) => {

      // imageData is either a base64 encoded string or a file URI
      // If it's base64:  
      imageData = imageData.replace(/\r?\n|\r/g, "");
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      var newForm = new FormData();
      newForm.append("file", this.base64Image);
      newForm.append("upload_preset", this.config.cloudinary.uploadPreset);
      this.http.post(`https://api.cloudinary.com/v1_1/${this.config.cloudinary.cloudId}/image/upload`, newForm)
        .subscribe(info => {
          this.picUrl = info.url;
        }, error => {
          var alertErr = this.alertCtrl.create({
            title: "ERROR",
            subTitle: JSON.stringify(error.json().error),
            buttons: ["close"]
          });
          alertErr.present(alertErr);
        });
      //put photos in grid for viewing  
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  findCard() {

  };



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

