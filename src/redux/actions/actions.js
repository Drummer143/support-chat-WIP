export const FETCH_EMAIL_REQUEST = 'FETCH_EMAIL_REQUEST';
export const FETCH_EMAIL_SUCCESS = 'FETCH_EMAIL_SUCCESS';
export const FETCH_EMAIL_FAILURE = 'FETCH_EMAIL_FAILURE';

export const signInRequest = ({email, password}) => { return { type: FETCH_EMAIL_REQUEST, email, password }};
export const signInSuccess = () => { return { type: FETCH_EMAIL_SUCCESS }};
export const signInFailure = (error) => { return { type: FETCH_EMAIL_FAILURE, error }};