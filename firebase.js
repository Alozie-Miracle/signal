import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRsz_1QjV2ty4oqGODreiQNLSUTNFR5s0",
  authDomain: "signal-3c48c.firebaseapp.com",
  projectId: "signal-3c48c",
  storageBucket: "signal-3c48c.appspot.com",
  messagingSenderId: "160121065034",
  appId: "1:160121065034:web:662ec08a95b6490a73a0b3",
};

let app;

const Initialize = () => {
  if (Firestore.app.length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app();
  }
};
const db = getFirestore(app);

export { Initialize, db };
