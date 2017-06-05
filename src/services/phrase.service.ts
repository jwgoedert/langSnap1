import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

@Injectable()
export class PhraseService {
  public source: string;
  public target: string;
  public sentence: string;
  public phrase: string;
  public translatedPhrase: string;
  public nativeSentence: string;

  constructor(public http: Http,
    public alertCtrl: AlertController) {
    
    this.http = http;
    this.alertCtrl = alertCtrl;
  }

  getPhrase(word) {
    console.log('inside get phrase service')

    // i wonder if it will still work with two words
    // try commenting this out 
    if (word.split('').length > 1){
      word = word.split(' ')[0]
      console.log(word)
    }
    return this.http.get(`http://52.14.252.211/v1/oxford/sentence/word/${word}`)
    .map(phrase => phrase)
    .subscribe(phrase => {
      console.log("phrase")
      // console.log(JSON.stringify(phrase))
      console.log(phrase)
      console.log("phrase")
      let arrOFSentences = [];
      let results = JSON.parse(phrase['_body']).results[0].lexicalEntries[0].sentences
        .filter((obj) => {
          if (obj.text.length < 100) {
            console.log(obj.text) 
            arrOFSentences.push(obj.text);
            return obj.text; 
          }
        });
      // console.log('results')
      // console.log(JSON.stringify(arrOFSentences));
      // console.log('results')

      this.sentence = arrOFSentences[Math.floor(Math.random() * arrOFSentences.length - 1)]
      console.log("this.sentence");
      console.log(this.sentence);
      console.log("this.sentence");
      this.translatePhrase(this.sentence);
      this.nativePhrase(this.sentence);
    }), error => console.log(JSON.stringify(error));
  }

  translatePhrase(phrase) {
    if (this.target === 'en') {
      this.translatedPhrase = this.sentence;
    } else {
      let tranlationData = {
        "q": phrase,
        "source": 'en',
        "target": this.target
      }
      console.log('inside translate phrase')
      console.log(JSON.stringify(tranlationData))
      console.log('inside translate phrase')
      return this.http.post('http://52.14.252.211/v1/googletranslate/sentence', tranlationData)
      .map(translate => {
        console.log("translatePhrase")
        console.log(translate)
        console.log(JSON.stringify(translate))
        console.log("translatePhrase")
        // var formError = this.alertCtrl.create({
        //  title: "Translation",
        //  subTitle: JSON.stringify(translate),
        //  buttons: ['close']
        // });
        // formError.present(formError);
        // this.translationUpdate.emit(this.translation);
          return translate.json();
      })
      .subscribe(resp => {
        console.log('inside translate phrase subscribe')
        console.log(JSON.stringify(resp))
        console.log('inside translate phrase  subscribe')
        this.translatedPhrase = resp.data.translations[0].translatedText;
        return this.translatedPhrase;
      })
    }
  }
  nativePhrase(phrase) {
    if (this.source === 'en') {
      this.nativeSentence = this.sentence;
    } else {
      let tranlationData = {
        "q": phrase,
        "source": 'en',
        "target": this.source
      }
      console.log('inside native phrase')
      console.log(JSON.stringify(tranlationData))
      console.log('inside native phrase')
      return this.http.post('http://52.14.252.211/v1/googletranslate/sentence', tranlationData)
      .map(translate => {
        console.log("nativePhrase")
        console.log(translate)
        console.log(JSON.stringify(translate))
        console.log("nativePhrase")
        // var formError = this.alertCtrl.create({
        //  title: "Translation",
        //  subTitle: JSON.stringify(translate),
        //  buttons: ['close']
        // });
        // formError.present(formError);
        // this.translationUpdate.emit(this.translation);
          return translate.json();
      })
      .subscribe(resp => {
        console.log('inside nativePhrase subscribe')
        console.log(JSON.stringify(resp))
        console.log('inside nativePhrase subscribe')
        this.nativeSentence = resp.data.translations[0].translatedText;
        return this.nativeSentence;
      })
    }
  }
  setTargetTrasnlationLang(source, target) {
    this.source = source;
    this.target = target;
  }
}
