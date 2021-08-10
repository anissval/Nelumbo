import React, {useEffect, useState} from "react";
import {StyledFirebaseAuth} from "react-firebaseui";
import {emailProviderID, googleProviderID, nelumboAuth} from "../../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useFirebase} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {UserForm} from "../userForm/UserForm";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/SignIn',
    // We will display Google as auth providers.
    // I may add facebookProviderID in the future
    signInOptions: [
        googleProviderID,
        emailProviderID
    ]
};
export const SignIn = () => {
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth)

    return (

        (!auth.isEmpty)? <UserForm/> :
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    );
};
