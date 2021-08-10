import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer, getFirebase } from 'react-redux-firebase';
import thunk from "redux-thunk";
import {createFirestoreInstance, firestoreReducer, reduxFirestore, getFirestore} from "redux-firestore";
import {rootReducer} from "../reducers/reducers";

const firebaseConfig = {
    apiKey: "AIzaSyD35bmlSosZRMk4ATz4y26xOLAs_pmrPcw",
    authDomain: "nelumbo-ce964.firebaseapp.com",
    projectId: "nelumbo-ce964",
    storageBucket: "nelumbo-ce964.appspot.com",
    messagingSenderId: "798589200664",
    appId: "1:798589200664:web:1d44f8cd86a424ee76566d",
    measurementId: "G-S3MPLTDWJJ"
};


/*const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};
 */

//const rfConfig = {} // optional redux-firestore Config Options
firebase.initializeApp(firebaseConfig);
export const nelumboAuth = firebase.auth();
firebase.firestore();

const rrfConfig = {
    enableLogging: true,
    userProfile: 'users', // root that user profiles are written to
    attachAuthIsReady: true,
    updateProfileOnLogin: true, // enable/disable updating of profile on login
    useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
    useFirestoreForStorageMeta: true // Metadata associated with storage file uploads goes to Firestore
};
const initialState = {};
// Add reduxReduxFirebase enhancer when making store creator
const composedEnhancers = compose(
    applyMiddleware(
        thunk),
         reduxFirestore(firebase, rrfConfig)
      );
const store = createStore(rootReducer, initialState, composedEnhancers)

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};

export const googleProviderID = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
export const facebookProviderID = firebase.auth.FacebookAuthProvider.PROVIDER_ID;
export const emailProviderID = firebase.auth.EmailAuthProvider.PROVIDER_ID;

export { store, rrfProps };
