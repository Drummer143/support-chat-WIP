import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCyYnL1EDxgjuNI1Tachos5LPgMMrTtHVM",
  authDomain: "support-chat-24b46.firebaseapp.com",
  projectId: "support-chat-24b46",
  storageBucket: "support-chat-24b46.appspot.com",
  messagingSenderId: "1089625819670",
  appId: "1:1089625819670:web:4fb12f1c5636521ea44337",
  measurementId: "G-3D1DFXS4SD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);