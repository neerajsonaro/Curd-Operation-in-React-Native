import React,{Component} from 'react';
import { AppRegistry,Text} from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUFX3yhndVSbZN5bls8cS_-ueELFELTnY",
  authDomain: "react-database-946c4.firebaseapp.com",
  databaseURL: "https://react-database-946c4.firebaseio.com",
  storageBucket: "react-database-946c4.appspot.com",
};



export default class CreateFirebase extends Component
{
  static myInstance = null;
  static getInstance() {
       if (this.myInstance == null) {
           this.myInstance = new CreateFirebase();
       }
       return this.myInstance;
}

  static firebaseApp = null;

  _userID = "";

   _createFirebase=()=> {
    if (this.firebaseApp == null) {
      this.firebaseApp = firebase.initializeApp(firebaseConfig);
    }
    return this.firebaseApp;
  }

   getUserID=()=> {
        return this._userID;
    }

  setUserID=(id)=> {
        this._userID = id;
    }

}
