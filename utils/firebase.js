//import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEpmmY8u8q6Ow2JaghKJBx2z9MbULBLY0",
  authDomain: "leagueoflegends-skins-firebase.firebaseapp.com",
  projectId: "leagueoflegends-skins-firebase",
  storageBucket: "leagueoflegends-skins-firebase.appspot.com",
  messagingSenderId: "802194141249",
  appId: "1:802194141249:web:3c0bdbec8579f244e3d6c0",
  measurementId: "G-DE7TQBC6KE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//getAnalytics(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);