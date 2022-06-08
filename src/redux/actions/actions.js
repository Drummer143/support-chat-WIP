export const FETCH_LOGIN_EMAIL_REQUEST = 'FETCH_LOGIN_EMAIL_REQUEST';
export const FETCH_LOGIN_GOOGLE_REQUEST = 'FETCH_LOGIN_GOOGLE_REQUEST';
export const FETCH_SIGN_UP_REQUEST = 'FETCH_SIGN_UP_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_LOGIN_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_LOGIN_AUTH_FAILURE';

export const FETCH_SIGN_OUT_REQUEST = 'FETCH_SIGN_OUT';
export const FETCH_SIGN_OUT_SUCCESS = 'FETCH_SIGN_OUT_SUCCESS';

export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';

export const FETCH_PASSWORD_UPDATE_REQUEST = 'FETCH_PASSWORD_UPDATE_REQUEST';
export const FETCH_PASSWORD_UPDATE_SUCCESS = 'FETCH_PASSWORD_UPDATE_SUCCESS';

export const signInEmailRequest = ({ email, password }) => ({
    type: FETCH_LOGIN_EMAIL_REQUEST,
    email,
    password
});
export const signInGoogleRequest = () => ({ type: FETCH_LOGIN_GOOGLE_REQUEST });
export const signUpEmailRequest = ({ email, password }) => ({
    type: FETCH_SIGN_UP_REQUEST,
    email,
    password
});
export const authSuccess = () => ({ type: FETCH_AUTH_SUCCESS });
export const authFailure = (error) => ({ type: FETCH_AUTH_FAILURE, error });

export const signOutRequest = () => ({ type: FETCH_SIGN_OUT_REQUEST });
export const signOutSuccess = () => ({ type: FETCH_SIGN_OUT_SUCCESS });

export const passwordRecoverRequest = ({ email }) => ({
    type: FETCH_PASSWORD_RECOVER_REQUEST,
    email
});
export const passwordRecoverSuccess = () => ({
    type: FETCH_PASSWORD_RECOVER_SUCCESS
});

export const passwordUpdateRequest = ({ password, oobCode }) => ({
    type: FETCH_PASSWORD_UPDATE_REQUEST,
    password,
    oobCode
});
export const passwordUpdateSuccess = () => ({
    type: FETCH_PASSWORD_UPDATE_SUCCESS
});





/* export const FETCH_GET_DATA_REQUEST = 'FETCH_GET_DATA_REQUEST' */
export const FETCH_GET_DATA_SUCCESS = 'FETCH_GET_DATA_SUCCESS'

export const CHANGE_STATUS = 'CHANGE_STATUS'

/* export const getDataRequest = (status) => ({
    type: FETCH_GET_DATA_REQUEST,
    status: status
}) */

export const getDataSuccess = (data, status) => {
    return ({
        type: FETCH_GET_DATA_SUCCESS,
        dialogs: data,
        status: status
    })
}

export const changeStatus = (newStatus) => ({
    type: CHANGE_STATUS,
    status: newStatus
})