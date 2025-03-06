// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBs8y2_ZiciuNtlAuJ_57RO7KmRnei8C0c",
    authDomain: "redifu-dashboard.firebaseapp.com",
    projectId: "redifu-dashboard",
    storageBucket: "redifu-dashboard.firebasestorage.app",
    messagingSenderId: "460577779900",
    appId: "1:460577779900:web:19d5279041223e420420b9",
    measurementId: "G-ZBH3VJWB9X"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized:', app.name);
export const auth = getAuth(app);
export const db = getFirestore(app);