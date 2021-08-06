import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDb6q7TU14Cpsrd4QZU5U0Pp8CvNWkioy0",
  authDomain: "netflix-clone-bcc68.firebaseapp.com",
  projectId: "netflix-clone-bcc68",
  storageBucket: "netflix-clone-bcc68.appspot.com",
  messagingSenderId: "361508616298",
  appId: "1:361508616298:web:dcc16f15fa44131588f213",
};

// Setting Up Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

//explicit exports
export { auth };
//default export
export default db;

// [home_slideshow]