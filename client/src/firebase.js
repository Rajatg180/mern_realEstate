// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5sO3No3XvXqT2TvSbFeUPqF_62nVLQck",
  authDomain: "realestate-mern-723e6.firebaseapp.com",
  projectId: "realestate-mern-723e6",
  storageBucket: "realestate-mern-723e6.appspot.com",
  messagingSenderId: "810304062899",
  appId: "1:810304062899:web:69b48ec7c21df61a59f7c6",
  measurementId: "G-D8GLWT4EXW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);