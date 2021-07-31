import React from "react";
import {StyledFirebaseAuth} from "react-firebaseui";
import {emailProviderID, googleProviderID, nelumboAuth} from "../../firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/panaderia',
    // We will display Google as auth providers.
    // I may add facebookProviderID in the future
    signInOptions: [
        googleProviderID,
        emailProviderID
    ]
};
export const SignIn = () => {
    const [user] = useAuthState(nelumboAuth);

    return (
            user ? <div>Hola {user.displayName}!</div>: <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={nelumboAuth}/>
    );
};
