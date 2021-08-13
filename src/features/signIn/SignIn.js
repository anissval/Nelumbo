import React, {useEffect, useState} from "react";
import {StyledFirebaseAuth} from "react-firebaseui";
import {emailProviderID, googleProviderID, nelumboAuth} from "../../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useFirebase} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {UserForm} from "../userForm/UserForm";

const uiConfig = {
    signInFlow: 'popup',
    //TODO: add facebook option soon
    signInOptions: [
        googleProviderID,
        emailProviderID
    ]
};
export const SignIn = () => {
    const firebase = useFirebase();
    const auth = useSelector(state => state.firebase.auth);

    return (

        (!auth.isEmpty)? <UserForm/> :
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>

    );
};
