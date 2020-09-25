import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7-OpMIZN6XwmmtT7Z7s8VRngMmPN6Nkc",
  authDomain: "daily-moments-193cb.firebaseapp.com",
  databaseURL: "https://daily-moments-193cb.firebaseio.com",
  projectId: "daily-moments-193cb",
  storageBucket: "daily-moments-193cb.appspot.com",
  messagingSenderId: "33647034283",
  appId: "1:33647034283:web:27da1de8e6e0414166dcee",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
