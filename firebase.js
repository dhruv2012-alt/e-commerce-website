// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSWaqX9yltcyNt0130X3fzz7miFsw9cTs",
  authDomain: "roy-ai-ecommerce-platform.firebaseapp.com",
  projectId: "roy-ai-ecommerce-platform",
  storageBucket: "roy-ai-ecommerce-platform.firebasestorage.app",
  messagingSenderId: "199430674495",
  appId: "1:199430674495:web:2539e1e33d1e4296f2808a",
  measurementId: "G-24TZ0F2517"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);