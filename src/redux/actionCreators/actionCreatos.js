import { FETCH_EMAIL_FAILURE, FETCH_EMAIL_SUCCESS, FETCH_EMAIL_REQUEST } from "../actions/actions";

export const signInRequest = (email, password) => { type: FETCH_EMAIL_REQUEST, email, password };
export const signInSuccess = () => { type: FETCH_EMAIL_SUCCESS };
export const signInFailure = () => { type: FETCH_EMAIL_FAILURE };