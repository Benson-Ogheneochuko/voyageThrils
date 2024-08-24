// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import {env} from 'node:process'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_PROJECT_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firestore = initializeApp(firebaseConfig);
const analytics = getAnalytics(firestore);
export const db = getFirestore(firestore)