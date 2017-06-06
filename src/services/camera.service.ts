import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import { Config } from '../config';
​
@Injectable()
export class CameraService {
 translationUpdate: EventEmitter<string> = new EventEmitter();
 private serverUrl = `https://vision.googleapis.com/v1/images:annotate?key=${this.config.googleKey}`;
 public googleReq: any;
 public picUrl: any;
 public word: any;
 public title: any;
 public translation: any;
 public source: any;
 public target: any;
​ public loading: any;
​ public wordMap: any;

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
  //   this.loading = this.loadingCtrl.create({
  //     content: 'Learning takes time...',
  //     duration: 3000,
  //     dismissOnPageChange: true
  //   }).present();
  }
 sendPic(form) {
  console.log('inside send pic')
  console.log(form)
  console.log(JSON.stringify(form))
  console.log('look above')
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
     [{ "type": "LABEL_DETECTION", "maxResults": 5 }]
   }]
  }
  return this.http.post(this.serverUrl, this.googleReq).map(res => res.json()).map(data => {
   return data.responses[0].labelAnnotations[0].description;
  })
  .subscribe(word => {
   this.word = word
    // var formError = this.alertCtrl.create({
    //  title: "Other Form",
    //  subTitle: JSON.stringify(word),
    //  buttons: ['close']
    // });
    // formError.present(formError);
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
    return this.http.post('http://52.14.252.211/v1/googletranslate/wordmap', tranlationData)
      .map(translate => {
        this.word = JSON.parse(translate['_body'])[this.source];
        this.wordMap = JSON.parse(translate['_body']);
        console.log("JSON.stringify(this.wordMap)")
        console.log(JSON.stringify(this.wordMap))
        console.log("JSON.stringify(this.wordMap)")
        // var formError = this.alertCtrl.create({
        //  title: JSON.stringify(JSON.parse(translate['_body'])[this.source]),
        //  subTitle: JSON.stringify(JSON.parse(translate['_body'])[this.source]),
        //  buttons: ['close']
        // });
        // formError.present(formError);
        console.log("this.word")
        console.log(this.word)
        console.log("this.word")
        return this.word;
      })
      .subscribe(resp => {
        console.log('RESP', resp);
        console.log(JSON.stringify(resp));
        console.log('RESP');
        this.word = resp;
        console.log('word yea yea')
        console.log(this.word)
        console.log('word yea yea')
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
  addTitle(title) {
    this.title = title;
  }
  getTitle() {
    return this.title;
  }
  deleteTitle(){
    this.title = null;
  }
​   getTranslatedWord() {
    this.translation = this.wordMap[this.target]
    return this.translation;
  }
  languages(source, target) {
    this.source = source;
    this.target = target;
  }
  getCardInfo(){
    if (!this.title) {
      this.title = "Default Deck Name"
    }
   return {
    title: this.title,
    picture: this.picUrl,
    word: this.word,
    translation: this.translation,
    wordMap: this.wordMap, 
   }
  }
}
