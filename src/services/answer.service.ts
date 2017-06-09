import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../config';

@Injectable()
export class AnswerService {
  private learningLanguage: string;
  public deck: Array<any>;
  public answerChoices: Array<string> = [];

  constructor(
    public http: Http,
    private config: Config) {
    this.http = http;
  }

  clearChoiceArray() {
    this.answerChoices = [];
  }

  setLearnLang(lang) {
    this.learningLanguage = lang;
  }

  // function to change time intervals on card for user
  cardAnswer(deckId, cardId, choice) {
    let answer = {
      "deck_id": deckId,
      "card_id": cardId,
      "answer": choice
    }

    return this.http.post(`${this.config.serverUrl}/cards/paginganswer`, answer)
      .map(response => {
        console.log('still working')
        return response
      })
      .subscribe(resp => {
        return resp;
      })
  }

  // get 10 random cards from the deck user is being quizzed on
  getCards(userDeckId) {
    return this.http.get(`${this.config.serverUrl}/cards/deckid/${userDeckId}`)
      .map(deck => deck.json())
      .subscribe(deck => {
        deck[0].cards.forEach(card => {
          this.answerChoices.push(JSON.parse(card.wordMap)[this.learningLanguage]);
        });
        if (deck[0].cards.length > 10){
          this.deck = deck[0].cards.sort(() => 0.5 - Math.random()).slice(0,10);
          return this.deck;
        } else {
          this.deck = deck[0].cards;
          return this.deck.sort(() => 0.5 - Math.random());
        }
      }), error => console.log(error);
  }
}
