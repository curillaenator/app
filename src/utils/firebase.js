import firebase from "firebase/app";
// import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/database";
// import "firebase/functions";
// import "firebase/performance";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyD7ZvYY4PvOf9EIf3kIO6aOy1Q880v9sYA",
  authDomain: "art-app-2020.firebaseapp.com",
  // databaseURL: "https://test-obmenmarket.europe-west1.firebasedatabase.app/",
  projectId: "art-app-2020",
  storageBucket: "art-app-2020.appspot.com",
  messagingSenderId: "427415286571",
  appId: "1:427415286571:web:10ab9422bdd14840c04b6e",
  measurementId: "G-D2871J0KDN",
};

const app = firebase.initializeApp(config);

export const fb = firebase;
export const auth = firebase.auth();
// export const fsdb = firebase.firestore();
export const storage = firebase.storage();
export const an = firebase.analytics();
