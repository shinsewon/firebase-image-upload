import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import "firebase/compat/storage";
import 'firebase/compat/firestore'

const app = firebase.initializeApp({
 /* apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKEY,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,*/
  apiKey: "AIzaSyDTZAXTvN8IFgNwniyvg6C0D8PHJniKZ5w",
  authDomain: "auth-developer-a1cb2.firebaseapp.com",
  projectId: "auth-developer-a1cb2",
  storageBucket: "auth-developer-a1cb2.appspot.com",
  messagingSenderId: "1012678451484",
  appId: "1:1012678451484:web:7caeebe8553cf9cdb65ad9"
});

export const storage = firebase.storage();
export const db = firebase.firestore()

// export const auth = app.auth();

export { app as default };

