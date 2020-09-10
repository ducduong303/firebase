import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBlV935K8T9i6sD3Fqq_EP4QKMGndVXAkk",
    authDomain: "auth-76a0f.firebaseapp.com",
    databaseURL: "https://auth-76a0f.firebaseio.com",
    projectId: "auth-76a0f",
    storageBucket: "auth-76a0f.appspot.com",
    messagingSenderId: "161412778208",
    appId: "1:161412778208:web:912ea9f85c422fd79ce885",
    measurementId: "G-MN0Y3KDFE2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db ,auth ,storage}