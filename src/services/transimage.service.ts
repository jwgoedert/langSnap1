import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import { Config } from '../config';
​
@Injectable()
export class TransImageService {
 translationUpdate: EventEmitter<string> = new EventEmitter();
 private serverUrl = `https://vision.googleapis.com/v1/images:annotate?key=${this.config.googleKey}`;
 public googleReq: any;
 public picUrl: any;
 public word: any;
 public wordMap: any;
 public translation: any;
 public source: any;
 public target: any;

 constructor(public http: Http,
  public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController,
  public config: Config) {
  this.http = http;
  this.alertCtrl = alertCtrl;
  this.loadingCtrl = loadingCtrl;
​
 }
​
  showLoading(wait) {
    let loading = this.loadingCtrl.create({
      content: 'Please wait... Learning takes time.'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, wait);
  }
 sendPic(form) {
  return this.http.post(`https://api.cloudinary.com/v1_1/${this.config.cloudinary.cloudId}/image/upload`, form)
   .map(info => {
    this.picUrl = info.json().url;
    console.log(this.picUrl);
    return this.picUrl;
   }).toPromise()
   .then(url => {
    return this.getGoogle(url)
   })
   .then((word) => {
    this.word = word
   })
   .catch(err => {
    console.log('error from map:', JSON.stringify(err));
   });
 }
 
  getGoogle(imgUrl) {
  this.googleReq = {
   "requests": [{
    "image": { "source": { "imageUri": imgUrl } }, "features":
     [{ "type": "TEXT_DETECTION", "maxResults": 1 }]
   }]
  }
  return this.http.post(this.serverUrl, this.googleReq).map(res => res.json()).map(data => {
    console.log(data.responses[0], 'this is OCR Response!!!');
    return data.responses[0];
  })
  .subscribe(word => {
   this.word = word
   console.log(this.word)
   return this.googleWord(this.word, 'en');
   // call get 
  }, err => console.log(err),
  () => {
   this.returnWord(this.word)
  });
  }
​  
  googleWord(word, source) {

   let tranlationData = {
    "q": word,
    "source": source,
   }
    return this.http.post('http://52.14.252.211/v1/googleocr', tranlationData)
      .map(translate => {
        this.word = JSON.parse(translate['_body'])[this.source];
        this.wordMap = JSON.parse(translate['_body']);
        console.log(this.word, this.wordMap, 'the stuff dat you be lookin for');
        return this.word;
      })
      .subscribe(resp => {
        this.word = resp;
        return this.word;
      })
  }

  returnWord(word) {
    return word;
  }
​
  getWord() {
   return this.word;
  }
​
  getTranslation(word) {
   this.googleWord(word, 'en')
   
   this.translation = this.wordMap[this.target];

   return this.translation;
  }
​
​   getTranslatedWord() {
    this.translation = this.wordMap[this.target]
    return this.translation;
  }
  languages(source, target) {
    this.source = source;
    this.target = target;
  }
}