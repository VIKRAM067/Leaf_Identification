// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5kYqobEKAx6Pq0rc16lzSUCqAqizyhsw",
  authDomain: "finalproject0-60526.firebaseapp.com",
  projectId: "finalproject0-60526",
  storageBucket: "finalproject0-60526.appspot.com",
  messagingSenderId: "996914036840",
  appId: "1:996914036840:web:3986eec53d578f8ede3bdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }