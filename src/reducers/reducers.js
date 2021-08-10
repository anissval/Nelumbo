import {combineReducers} from "@reduxjs/toolkit";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {category} from "./category";

export const rootReducer = combineReducers({
    firebase : firebaseReducer,
    firestore : firestoreReducer,
    nelumboCategory : category
});
