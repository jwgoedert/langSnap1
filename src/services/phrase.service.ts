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

  constructor(public http: Http, public alertCtrl: AlertController) {
    this.http = http;
    this.alertCtrl = alertCtrl;
  }

  getPhrase(word) {
    if (word.split('').length > 1){
      word = word.split(' ')[0]
    }
    return this.http.get(`http://52.14.252.211/v1/oxford/sentence/word/${word}`)
    .map(phrase => phrase)
    .subscribe(phrase => {
      this.translatedPhrase = "";
      this.nativeSentence = "";
      let arrOFSentences = [];
      let results = JSON.parse(phrase['_body']).results[0].lexicalEntries[0].sentences
        .filter((obj) => {
          if (obj.text.length < 100) {
            arrOFSentences.push(obj.text);
            return obj.text; 
          }
        });

      this.sentence = arrOFSentences[Math.floor(Math.random() * arrOFSentences.length - 1)]
      console.log("this.sentence")
      console.log(this.sentence)
      console.log("this.sentence")
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
      return this.http.post('http://52.14.252.211/v1/googletranslate/sentence', tranlationData)
      .map(translate => translate.json())
      .subscribe(resp => {
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
      return this.http.post('http://52.14.252.211/v1/googletranslate/sentence', tranlationData)
      .map(translate => translate.json())
      .subscribe(resp => {
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
