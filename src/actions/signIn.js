export const SIGN_IN = 'SIGN_IN';
function signInUser(payload) {
    return {
        type: SIGN_IN,
        payload
    }
}

export function createUser(user) {
    return (dispatch, getState, getFirebase) => {
        return getFirebase()
            .ref('users')
            .push(user)
            .then(() => {
                dispatch(signInUser(user))
            })
    }
}
