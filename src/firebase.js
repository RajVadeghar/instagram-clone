import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  // Your firebase config stuff goes here
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();

export { db, auth, storage };
