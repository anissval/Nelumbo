import React from 'react';
import {StyledFirebaseAuth} from "react-firebaseui";
import {emailProviderID, facebookProviderID, googleProviderID} from "../../firebase/firebase";
import {useFirebase} from "react-redux-firebase";
import {useSelector} from "react-redux";
import {UserForm} from "../userForm/UserForm";
import {makeStyles} from "@material-ui/styles";
import {LOGIN_TITLE_TEXT} from "../../utils/constants/constants";
import {signInStyles} from "./SignIn.styles";

const uiConfig = {
    signInFlow: 'popup',
    //TODO: add facebook option soon
    signInOptions: [
        googleProviderID,
        facebookProviderID,
        emailProviderID
    ],
};

const useStyles = makeStyles((theme) => signInStyles(theme));

export const SignIn = () => {
    const signInClasses = useStyles();
    const firebaseAuth = useFirebase().auth();
    const auth = useSelector(state => state.firebase.auth);
    return (
        <div>
            {(!auth.isEmpty) ? <UserForm/> :
                <div className={signInClasses.root}><p>{LOGIN_TITLE_TEXT}</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth}/>
                </div>
            }
        </div>
    );
};
