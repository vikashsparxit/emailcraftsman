import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAXvNNm3ewZ0D3q5CcFKs3cmDPfhw1ILdc",
  authDomain: "emailcraftman.firebaseapp.com",
  projectId: "emailcraftman",
  storageBucket: "emailcraftman.firebasestorage.app",
  messagingSenderId: "64726231528",
  appId: "1:64726231528:web:5f9efa515560d1abab5c5d",
  measurementId: "G-75TMMSZ2J5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Auth Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Enable persistence to keep the user logged in
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase persistence enabled');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  });

console.log('Firebase initialized');
