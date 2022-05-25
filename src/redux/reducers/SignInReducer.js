import defaultState from './../defaultState';
import { FETCH_LOGIN_FAILURE, FETCH_LOGIN_SUCCESS, FETCH_LOGIN_EMAIL_REQUEST, FETCH_LOGIN_GOOGLE_REQUEST } from './../actions/actions';
import { auth } from './../../firebase';

export const signInReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_GOOGLE_REQUEST:
        case FETCH_LOGIN_EMAIL_REQUEST:
            return {
                requesting: true,
                user: false,
                error: ''
            };
        case FETCH_LOGIN_SUCCESS:
            return {
                requesting: false,
                user: auth.currentUser,
                error: '',
            };
        case FETCH_LOGIN_FAILURE:
            return {
                requesting: false,
                user: false,
                error: action.error
            };

        default: return state;
    };
}