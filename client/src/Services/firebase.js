import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDr9OgxH91_xOGKaDGkvX9Cmv7aw8OVU4",
    authDomain: "chat-messenger-302313.firebaseapp.com",
    projectId: "chat-messenger-302313",
    storageBucket: "chat-messenger-302313.appspot.com",
    messagingSenderId: "951053822849",
    appId: "1:951053822849:web:64e6a8918f29dd2df59680"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider};