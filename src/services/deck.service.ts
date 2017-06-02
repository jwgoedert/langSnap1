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
  public deckId: any;
  public currentDeck: Array<any> = [];
  public creatingDeck: Array<object> = [];

  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public config: Config) {
    this.http = http;
    this.alertCtrl = alertCtrl;
    this.usersDecks = [];
    this.allDecks = [];
  }
  ngOnInit() {
    // this.usersDecks = this.getUsersDecks(1);
    // this.allDecks = this.getAllDecks();
  }
  addToDeckCreation(card) {
    console.log("inside add card to deck creation function");
    console.log(JSON.stringify(card));
    this.creatingDeck.push(card);
    console.log('this.creatingdeck');
    console.log(JSON.stringify(this.creatingDeck));
    console.log('this.creatingdeck');
    console.log("inside add card to deck creation function")
  }
  deckCreation() {
    console.log("inside deck creation function that returns current un finished deck")
    console.log(JSON.stringify(this.creatingDeck))
    console.log("inside deck creation function that returns current un finished deck")
    return this.creatingDeck;
  }
  clearDeckCreation() {
    console.log("inside clear deck creation function")
    this.creatingDeck = [];
    console.log(JSON.stringify(this.creatingDeck))
    console.log("inside clear deck creation function")
  }
  //create deck page
  postUserDeck(deckName, userId) {
    let reqBody = {
      "name": deckName,
      "user_id": userId,
      "stars": 5
    }
    console.log('inside post user deck');
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
    console.log('inside post card')
    console.log(JSON.stringify(addCard))
    console.log('inside post card')
    this.http.post(`${this.serverDBUrl}/v1/cards/addcard`, addCard)
      .map(deck => deck.json())
      .subscribe(deckObj => {
        console.log('post card')
        console.log(JSON.stringify(deckObj));
        console.log('post card')
        return deckObj.id;
      }), error => console.log(error);

  }
  //mydecks page
  getUsersDecks(userId) { 
    return this.http.get(`${this.serverDBUrl}/v1/decks/userid/${userId}`)
      .map(deck => deck.json().forEach(el => {
        this.usersDecks.push(el);
        return this.usersDecks;
      }))
      .subscribe(deckName => {
        console.log("deck name")
        console.log(JSON.stringify(deckName))
        console.log(JSON.stringify(this.usersDecks))
        console.log("deck name")
        
        return this.usersDecks;
      }), error => console.log(error);
  }

  getAllCardsInADeck(userDeckId) {
    return this.http.get(`${this.serverDBUrl}/v1/cards/deckid/${userDeckId}`)
      .map(deck => deck.json().forEach(el => {
        this.currentDeck.push(el);
        return el;
      }))
      .subscribe(deck => {
        console.log("looking for deck")
        console.log(JSON.stringify(deck))
        console.log(JSON.stringify(this.currentDeck))
        console.log("looking for deck")
        if (!this.currentDeck[0].cards.length){
          this.currentDeck[0].cards[0] = {
            imgUrl: "https://www.askideas.com/media/08/Sorry-With-Emoticon-Picture.jpg",
            wordMap : JSON.stringify({
              sorry: "No Cards, Try Another Deck",
              reallSorry: "Seriously Pick Another Deck Already."
            })
          }
          console.log("JSON.stringify(this.currentDeck)")
          console.log(JSON.stringify(this.currentDeck))
          console.log("JSON.stringify(this.currentDeck)")
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
  deleteADeck(deckId,userId) {
    this.http.delete((`${this.serverDBUrl}/v1/decks/${deckId}`))
    .map( res => res)
    .subscribe( resp => {
      console.log("DELETING FROM INSIDE APP");
      console.log(JSON.stringify(resp));
      this.usersDecks = [];
      return this.getUsersDecks(userId);
      
      // console.log(userId);
      // return resp;
    }), err => {
      console.log("fromDelete");
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
        console.log("all decks?????????????????????????????????????????????");
        console.log(deckName);
        console.log(JSON.stringify(this.allDecks))
        return this.allDecks;
      }), error => console.log(error);
  }
  addDecksToUser(userId, deckIds) {
  }
  //find a card
  getAllCards() {
    this.http.get(`${this.serverDBUrl}/v1/decks/all`)
  }
  addCards(cards) {
  }
}