export const FETCH_LOGIN_EMAIL_REQUEST = 'FETCH_EMAIL_REQUEST';
export const FETCH_LOGIN_GOOGLE_REQUEST = 'FETCH_GOOGLE_REQUEST';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_EMAIL_SUCCESS';
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_EMAIL_FAILURE';

export const signInEmailRequest = ({email, password}) => { return { type: FETCH_LOGIN_EMAIL_REQUEST, email, password }};
export const signInEmailSuccess = () => { return { type: FETCH_LOGIN_SUCCESS }};
export const signInEmailFailure = (error) => { return { type: FETCH_LOGIN_FAILURE, error }};
export const signInGoogleRequest = () => { return {type: FETCH_LOGIN_GOOGLE_REQUEST }};