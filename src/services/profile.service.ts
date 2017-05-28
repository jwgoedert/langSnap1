import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
@Injectable()
export class ProfileService {
  public http: Http;
  private user;
  public data;
  constructor(http: Http,
    public alertCtrl: AlertController) {
    this.http = http;
    this.alertCtrl = alertCtrl;
  }
	public setUser(userName, source) {
    console.log(userName, source, 'inside Profile Service')
    this.user = {
      userName,
      source
    }
    this.http.get(`http://f377bcf8.ngrok.io/v1/users/auth/${source}/${userName}`)
      .subscribe(data => {
        this.data = JSON.stringify(data);
        console.log(data, 'Data');
        var alert = this.alertCtrl.create({
          title: "Success is a hello!",
          subTitle: JSON.stringify(data),
          buttons: ["close"]
        });
        alert.present(alert);
        console.log("Success", JSON.stringify(data))
      }, error => {
        console.log(JSON.stringify(error.json()));
      })
      console.log('after')
  }
}