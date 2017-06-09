import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import { Config } from '../config';
​
@Injectable()
export class TransImageService {
 translationUpdate: EventEmitter<string> = new EventEmitter();
 private serverUrl = 'http://52.14.252.211';
 public googleReq: any;
 public picUrl: any;
 public word: any;
 public wordMap: any;
 public translation: any;
 public source: any;
 public target: any;
 public nativeLang: string;
 public learnLang: string;

 constructor(public http: Http,
  public alertCtrl: AlertController, 
  public loadingCtrl: LoadingController,
  public config: Config) {
  this.http = http;
  this.alertCtrl = alertCtrl;
  this.loadingCtrl = loadingCtrl;
​
 }

 setLearnAndNativeLangs(nativeLang, learnLang) {
   this.nativeLang = nativeLang;
   this.learnLang = learnLang;
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
    console.log('this.picUrl');
    console.log(this.picUrl);
    console.log(JSON.stringify(this.picUrl));
    console.log('this.picUrl');
    return this.picUrl;
   }).toPromise()
   .then((url) => {
     console.log('hi my name is Earl');
     console.log(url);
     console.log('hi my name is Earl');
    return this.getGoogle(url, this.nativeLang, this.learnLang)
   })
   .then((word) => {
     console.log('word up yo');
     console.log(JSON.stringify(word));
     console.log('word up yo');
    this.word = word
   })
   .catch(err => {
    console.log('error from map:', JSON.stringify(err));
   });
 }
 
  getGoogle(imgUrl, nativeLang, learnLang) {
    console.log('before using google OCR on the image');
    console.log(imgUrl);
    console.log('before using google OCR on the image');
  return this.http.post(`${this.serverUrl}/v1/googleocr`, { url: imgUrl })
    .map(res => {
      console.log('response from googleORNLKSDGJHSD:G');
      console.log('response from googleORNLKSDGJHSD:G');
      console.log(res);
      console.log(JSON.stringify(res));
      // console.log(res.json());
      console.log('response from googleORNLKSDGJHSD:G');
      return res;
    }).subscribe(data => {
    console.log('this is OCR Response!!!');
    console.log('before using google OCR on the image');
    console.log(JSON.stringify(data));
    console.log(data['_body']);
    this.word = data['_body'];
    console.log(this.word);
    console.log('before using google OCR on the image');
    console.log('before using google OCR on the image');
    return this.googleWord(this.word, this.nativeLang, this.learnLang);
    
  })
  , err => {
    console.log('error in err block after subscribe google ocr');
    console.log(err)
  }

  }
​  
  googleWord(word, source, target) {
   let tranlationData = {
    "q": word,
    "source": source,
    "target": target,
   }
   console.log('before I go get a sentence from google');
   console.log(word);
   console.log(source);
   console.log(target);
   console.log('before I go get a sentence from google');
    return this.http.post(`${this.serverUrl}/v1/googletranslate/sentence`, tranlationData)
      .map(translate => {
   console.log('after I go get a sentence from google');
   console.log('after I go get a sentence from google');
   console.log(JSON.stringify(translate));
   console.log('after I go get a sentence from google');        
        console.log('man on the inside yo');
        this.word = JSON.parse(translate['_body']).data.translations[0].translatedText;
        console.log("this.word");
        console.log(this.word);
        console.log("this.word");
        
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
   this.googleWord(word, this.nativeLang, this.learnLang)
   
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