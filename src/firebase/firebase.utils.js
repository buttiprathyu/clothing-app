import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD7peVpbJ_1Fq47ZtAr3tbfQr84ujVHjWg",
  authDomain: "crwndb-f6e22.firebaseapp.com",
  databaseURL: "https://crwndb-f6e22.firebaseio.com",
  projectId: "crwndb-f6e22",
  storageBucket: "crwndb-f6e22.appspot.com",
  messagingSenderId: "924828080441",
  appId: "1:924828080441:web:465c719367ce4b9367b0e8",
  measurementId: "G-S016B500H6",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
