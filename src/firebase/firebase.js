import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD35bmlSosZRMk4ATz4y26xOLAs_pmrPcw",
    authDomain: "nelumbo-ce964.firebaseapp.com",
    projectId: "nelumbo-ce964",
    storageBucket: "nelumbo-ce964.appspot.com",
    messagingSenderId: "798589200664",
    appId: "1:798589200664:web:1d44f8cd86a424ee76566d",
    measurementId: "G-S3MPLTDWJJ"
};
// Initialize Firebase
export const googleProviderID = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const facebookProviderID = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const emailProviderID = firebase.auth.EmailAuthProvider.PROVIDER_ID;

export const fb = firebase.initializeApp(firebaseConfig);

export const nelumboAuth = firebase.auth();
export const firestore = firebase.firestore();


