import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqK8aobAaai69e3gRfhHzDIusx1qyr0Q0",
  authDomain: "mern-advanced-auth-631f4.firebaseapp.com",
  projectId: "mern-advanced-auth-631f4",
  storageBucket: "mern-advanced-auth-631f4.firebasestorage.app",
  messagingSenderId: "871622792911",
  appId: "1:871622792911:web:64ab33a2a1c46214dd89ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
