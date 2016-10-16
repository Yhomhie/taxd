import { Component } from '@angular/core';

import { NavController, ModalController , NavParams, ViewController, AlertController, ActionSheet } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  userProfile: any = null;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      let facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
        })
        .catch((error) => {
          console.log("Firebase failure: " + JSON.stringify(error));
      });

    }).catch((error) => { console.log(error) });
  }

  showModal() {
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.onDidDismiss(data => {
      //this.showTasks();
    })
    modal.present();
  }
}

@Component({
  template: `
  <ion-header>
    <ion-toolbar color="primary">
    <ion-title>Add Task</ion-title>
    <ion-buttons start>
        <button light (click)="close()">
            <span showWhen="ios">Cancel</span>
            <ion-icon name="close" showWhen="android,windows"></ion-icon>
        </button>
    </ion-buttons>
    </ion-toolbar>
  </ion-header>

<ion-content>
    <ion-list>
        <ion-item>
            <ion-label stacked>Task</ion-label>
            <ion-input type="text" [(ngModel)]="task"></ion-input>
        </ion-item>

        <ion-item>
            <ion-label>Priority</ion-label>
            <ion-select [(ngModel)]="priority">
                <ion-option value="high">High</ion-option>
                <ion-option value="normal">Normal</ion-option>
                <ion-option value="low">Low</ion-option>
            </ion-select>
        </ion-item>
    </ion-list>

    <div padding>
        <button ion-button full round (click)="saveTask()">Save</button>
    </div>
</ion-content>
  `
})
export class ModalsContentPage {
  task;
  priority

  constructor(public navCtrl: NavController,public params: NavParams, public viewCtrl: ViewController, public alertCtrl: AlertController) {
    this.priority = "normal";
  }

  close(){
    this.viewCtrl.dismiss();
  }

}