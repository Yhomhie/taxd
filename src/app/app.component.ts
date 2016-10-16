import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import firebase from 'firebase';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: []
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
      firebase.initializeApp({
            apiKey: "AIzaSyB6kBCVQD8zXDJuKtfOAeTwpE3JqzhhGTE",
            authDomain: "tbook-ba3b1.firebaseapp.com",
            databaseURL: "https://tbook-ba3b1.firebaseio.com",
            storageBucket: "tbook-ba3b1.appspot.com",
            messagingSenderId: "495589516057"
        });

        platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }
}
