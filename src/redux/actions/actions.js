export const FETCH_LOGIN_EMAIL_REQUEST = 'FETCH_LOGIN_EMAIL_REQUEST';
export const FETCH_LOGIN_GOOGLE_REQUEST = 'FETCH_LOGIN_GOOGLE_REQUEST';
export const FETCH_SIGN_UP_REQUEST = 'FETCH_SIGN_UP_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_LOGIN_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_LOGIN_AUTH_FAILURE';
export const FETCH_SIGN_OUT = 'FETCH_SIGN_OUT';
export const FETCH_PASSWORD_RECOVER_REQUEST = 'FETCH_PASSWORD_RECOVER_REQUEST';
export const FETCH_PASSWORD_RECOVER_SUCCESS = 'FETCH_PASSWORD_RECOVER_SUCCESS';

export const signInEmailRequest = ({email, password}) => { return { type: FETCH_LOGIN_EMAIL_REQUEST, email, password }};
export const signInGoogleRequest = () => { return { type: FETCH_LOGIN_GOOGLE_REQUEST }};
export const signUpEmailRequest = ({email, password}) => { return { type: FETCH_SIGN_UP_REQUEST, email, password }};
export const authSuccess = () => { return { type: FETCH_AUTH_SUCCESS }};
export const authFailure = (error) => { return { type: FETCH_AUTH_FAILURE, error }};
export const signOut = () => { return { type: FETCH_SIGN_OUT }};
export const passwordRecoverRequest = ({email}) => { return { type: FETCH_PASSWORD_RECOVER_REQUEST, email }};
export const passwordRecoverSuccess = () => { return { type: FETCH_PASSWORD_RECOVER_SUCCESS }};