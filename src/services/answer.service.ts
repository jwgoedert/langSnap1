import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';

@Injectable()
export class AnswerService {
  public http: Http;
  public languages: Array<string>;

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
}
