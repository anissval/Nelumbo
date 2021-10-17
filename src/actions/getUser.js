import {processDataFromDB} from "../utils/Utils";

export const GET_USER = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";

export const getUserByID = (id) => {
    let payload = {
        id: id
    }
    return {
        type: GET_USER_BY_ID,
        payload
    }
}

export const getUserByEmail = async (dispatch, getState, getFirestore, userEmail) => {
    const usersQueryByEmail = getFirestore().collection('users').where("email", "==", userEmail);
    const userData = await processDataFromDB(usersQueryByEmail.get());

    user.get().then((querySnapshot) => {
        const userData = processDataFromDB(querySnapshot);
        if (userData !== undefined) {
            return userData;
        } else {
            //
        }
    }).catch((error) => {
        console.log("error searching item", error);
    }).finally(() => {

    });

    let payload = {
        email: userEmail,
        dispatch
    }
    return {
        type: GET_USER_BY_ID,
        payload
    }
}
