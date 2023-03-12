import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDhVoDJQVu10kVCKflSWu67O7tLOzKmGOo",
  authDomain: "react-registerpage.firebaseapp.com",
  projectId: "react-registerpage",
  storageBucket: "react-registerpage.appspot.com",
  messagingSenderId: "327121944084",
  appId: "1:327121944084:web:a8fa7ec43cff09acfa7101",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
