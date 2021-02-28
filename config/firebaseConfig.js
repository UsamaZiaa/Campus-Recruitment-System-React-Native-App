import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyA1vMJTVGxleDJQ5exuHkNX0Rxiu21x_og",
    authDomain: "campus-recruitment-syste-4ed99.firebaseapp.com",
    projectId: "campus-recruitment-syste-4ed99",
    storageBucket: "campus-recruitment-syste-4ed99.appspot.com",
    messagingSenderId: "667517517827",
    appId: "1:667517517827:web:f2973cf44cf47e56a04e36"
  };

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase