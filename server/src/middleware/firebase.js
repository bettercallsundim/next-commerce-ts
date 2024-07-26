import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectedResult,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAdOxaxgrxmfkjar8VE09iU_W7ZDvvfdv0",
  authDomain: "social-media-7692f.firebaseapp.com",
  projectId: "social-media-7692f",
  storageBucket: "social-media-7692f.appspot.com",
  messagingSenderId: "377573366533",
  appId: "1:377573366533:web:1bc524b1e5f6e5a039356c",
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);

export const signInWithGoogleRedirect = async () => {
  return signInWithRedirect(auth, provider);
};
