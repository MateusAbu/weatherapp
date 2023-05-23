import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyByy1_sy7bt93RsZCSW-od4_WHHopOpkfs",
  authDomain: "weather-app-1aac8.firebaseapp.com",
  projectId: "weather-app-1aac8",
  storageBucket: "weather-app-1aac8.appspot.com",
  messagingSenderId: "977667189455",
  appId: "1:977667189455:web:a6029db6d6de0357daa5ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db