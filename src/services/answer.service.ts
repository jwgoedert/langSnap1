import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AnswerService {
  public http: Http;
  private learningLanguage: string;
  public answerChoices: Array<string> = [];

  constructor(http: Http,
    public alertCtrl: AlertController) {
    this.http = http;
    this.alertCtrl = alertCtrl;
  }
  cardAnswer(deckId, cardId, choice) {
    let answer = {
      "deck_id": deckId,
      "card_id": cardId,
      "answer": choice
    }

    return this.http.post('http://52.14.252.211/v1/cards/paginganswer', answer)
      .map(response => {
        return response
      })
      .subscribe(resp => {
        return resp;
      })
  }

  setLearnLang(lang) {
    this.learningLanguage = lang;
  }

  getCards(userDeckId) {
    return this.http.get(`http://52.14.252.211/v1/cards/deckid/${userDeckId}`)
      .map(deck => deck.json())
      .subscribe(deck => {
        console.log("deck")
        console.log(JSON.stringify(deck))
        console.log("deck")
        deck[0].cards.forEach(card => {
          this.answerChoices.push(JSON.parse(card.wordMap)[this.learningLanguage]);
        });
        console.log("this.answerChoices")
        console.log(JSON.stringify(this.answerChoices))
        console.log("this.answerChoices")
        return deck[0].cards;
      }), error => console.log(error);
  }

  clearChoiceArray() {
    this.answerChoices = [];
  }

}
