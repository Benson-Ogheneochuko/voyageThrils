import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import {env} from 'node:process'

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_PROJECT_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
}

export const firestoreApp = initializeApp(firebaseConfig)
export const firestoreDb = getFirestore(firestoreApp)
