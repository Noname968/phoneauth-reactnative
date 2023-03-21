import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyAcbU4dzZWmLgUh59BvdLqXczayCT61ew8",
    authDomain: "otpauth-reactnative.firebaseapp.com",
    projectId: "otpauth-reactnative",
    storageBucket: "otpauth-reactnative.appspot.com",
    messagingSenderId: "559322977976",
    appId: "1:559322977976:web:b0a4306640c7beeb03864d"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

