import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoNK9MfSfh14RHfkQ5ZXA2OTJQppcEQcw",
  authDomain: "sin143-evenly.firebaseapp.com",
  projectId: "sin143-evenly",
  storageBucket: "sin143-evenly.appspot.com",
  messagingSenderId: "1070860600359",
  appId: "1:1070860600359:web:0cf695cb17e8f278893a02"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function signIn(email, senha, successCallback) {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const token = user.getIdToken();
      document.cookie = `token=${token}; path=/;`;
      window.location.replace('/home');
      if (successCallback) 
        successCallback(true);
      return token;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (successCallback) 
        successCallback(false);
      //console.log('error ' + errorCode + ': ' + errorMessage);
    });
}

export function signUp(email, senha) {
  return createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
      return uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      throw new Error(errorCode + ': ' + errorMessage);
    });
}

export function isLoggedIn() {
  const auth = getAuth();
  
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // O usuário está logado
        resolve(true);
      } else {
        // O usuário não está logado
        resolve(false);
      }
    });
  });
}

export default function getUid() {
  const user = auth.currentUser;
  if (user !== null) {
    const uid = user.uid;
    return uid;
  }else{
    const storedUid = localStorage.getItem('uid');
    return storedUid;
  }
}