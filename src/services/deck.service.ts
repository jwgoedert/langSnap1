import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { OAuthProfile } from '../pages/oauth/models/oauth-profile.model';
import { Config } from '../config';
@Injectable()
export class DeckService {
  private serverDBUrl = `http://52.14.252.211`;
  // private serverDBUrl = `http://b79754e7.ngrok.io`;
  public usersDecks: any;
  public allDecks: any;
  public allCards: any;
  public deckId: any;
  public currentDeck: Array<any> = [];
  public cardNames: Array<any> = [];
  public creatingDeck: Array<object> = [];

  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public config: Config) {
    this.http = http;
    this.alertCtrl = alertCtrl;
    this.usersDecks = [];
    this.allDecks = [];
    this.allCards = [];
  }

  addToDeckCreation(card) {
    this.creatingDeck.push(card);
  }
  editDeckCreation(word) {
    this.creatingDeck[this.creatingDeck.length - 1]['word'] = word;
  }
  deckCreation() {
    return this.creatingDeck;
  }
  clearDeckCreation() {
    this.creatingDeck = [];
  }
  //create deck page
  postUserDeck(deckName, userId) {
    let reqBody = {
      "name": deckName,
      "user_id": userId,
      "stars": 5
    }
    return this.http.post(`${this.serverDBUrl}/v1/decks/new`, reqBody)
      .map(deck => deck.json())
      .subscribe(deckObj => {
        this.deckId = deckObj.id;
        return deckObj.id;
      }), error => console.log(error);
  }
  //post cards to deck
  getDeckId() {
    return this.deckId;
  }
  postCardToUserDeck(addCard) {
    this.http.post(`${this.serverDBUrl}/v1/cards/addcard`, addCard)
      .map(deck => deck.json())
      .subscribe(deckObj => {
        return deckObj.id;
      }), error => console.log(error);

  }
  postCardsToUserDeck(addCards) {
    // console.log('ADDCARDS');
    // console.log(JSON.stringify(addCards));
    this.http.post(`${this.serverDBUrl}/v1/decks/addcards`, addCards)
      .map(deck => deck)
      .subscribe(deckres => deckres),
      error => {
        console.log('Error adding cards');
        console.log(error);
      }
  }
  //mydecks page
  getUsersDecks(userId) {
    this.usersDecks = [];
    return this.http.get(`${this.serverDBUrl}/v1/decks/userid/${userId}`)
      .map(deck => deck.json().forEach(el => {
        this.usersDecks.push(el);
        return this.usersDecks;
      }))
      .subscribe(deckName => {
        return this.usersDecks.reverse();
      }), error => console.log(error);
  }

  getAllCardsInADeck(userDeckId) {
    return this.http.get(`${this.serverDBUrl}/v1/cards/deckid/${userDeckId}`)
      .map(deck => deck.json().forEach(el => {
        this.currentDeck.push(el);
        return el;
      }))
      .subscribe(deck => {
        if (!this.currentDeck[0].cards.length) {
          this.currentDeck[0].cards[0] = {
            imgUrl: "https://www.askideas.com/media/08/Sorry-With-Emoticon-Picture.jpg",
            wordMap: JSON.stringify({
              sorry: "No Cards, Try Another Deck",
              reallSorry: "Seriously Pick Another Deck Already."
            })
          }
          this.emptyCurrentDeck();
          return this.currentDeck;
        } else {
          this.emptyCurrentDeck();
          return this.currentDeck;
        }
      }), error => console.log(error);
  }
  getCurrentDeck() {
    return this.currentDeck;
  }
  emptyCurrentDeck() {
    setTimeout(() => {
      this.currentDeck = [];
    }, 2000)
  }
  deleteADeck(deckId, userId) {
    this.http.delete((`${this.serverDBUrl}/v1/decks/${deckId}`))
      .map(res => res)
      .subscribe(resp => {
        return resp;
      }), err => {
        console.log(JSON.stringify(err));
      }
  }
  //find/add decks page
  getAllDecks() {
    this.http.get(`${this.serverDBUrl}/v1/decks/all`)
      .map(deck => deck.json().forEach(el => {
        this.allDecks.push(el);
        return this.allDecks;
      }))
      .subscribe(deckName => {
        return this.allDecks;
      }), error => console.log(error);
  }
  addDecksToUser(addDecks) {
    this.http.post(`${this.serverDBUrl}/v1/decks/adddecks`, addDecks)
      .map(deck => deck)
      .subscribe(deckres => deckres),
      error => {
        console.log('Error adding cards');
        console.log(error);
      }

  }
  //find a card-get all cards everywhere....
  getAllCards() {
    this.http.get(`${this.serverDBUrl}/v1/cards/all`)
      .map(cards => {
        return cards.json()
      })
      .subscribe(allCards => {
        allCards.forEach((card, index) => {
          if (JSON.parse(card.wordMap)['en'] && (this.cardNames.indexOf(JSON.parse(card.wordMap)['en']) === -1)) {
            this.cardNames.push(JSON.parse(card.wordMap)['en']);
            this.allCards.push(card);
          }
        })

        return allCards;
      })
  }

}