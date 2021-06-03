const firebase = require("firebase/app")
require("firebase/firestore")

const firebaseConfig = { 
apiKey: "AIzaSyD-RLxCwIkAJqAkFyIpGw5F7ZqI_-Kkj6I",
authDomain: "kiei-451-ad584.firebaseapp.com",
projectId: "kiei-451-ad584",
storageBucket: "kiei-451-ad584.appspot.com",
messagingSenderId: "946230721329",
appId: "1:946230721329:web:ef0987433537e53ec0ce10"
} // replace

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

module.exports = firebase