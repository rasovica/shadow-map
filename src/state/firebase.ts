import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUBWDAAWqhkzJ4oHqxghq0SXTQI_5CGKo",
  authDomain: "shadowmap-9fb90.firebaseapp.com",
  databaseURL: "https://shadowmap-9fb90.firebaseio.com",
  projectId: "shadowmap-9fb90",
  storageBucket: "shadowmap-9fb90.appspot.com",
  messagingSenderId: "241914370396",
  appId: "1:241914370396:web:c3b320f4ccaac464efc999",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleAuthProvider)
    .catch(console.error)
    .then(console.log);
};

export const camerasRef = firebase.firestore().collection("cameras");
export const tileRef = firebase.firestore().collectionGroup("tiles");
