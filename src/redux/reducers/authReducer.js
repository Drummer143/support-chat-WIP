import { auth } from '../../firebase';

import { authDefaultState } from '../defaultState';
import {
    FETCH_SIGN_UP_REQUEST,
    FETCH_LOGIN_EMAIL_REQUEST,
    FETCH_LOGIN_GOOGLE_REQUEST,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_FAILURE,
    FETCH_PASSWORD_RECOVER_REQUEST,
    FETCH_PASSWORD_RECOVER_SUCCESS,
    FETCH_PASSWORD_UPDATE_REQUEST,
    FETCH_PASSWORD_UPDATE_SUCCESS,
    FETCH_SIGN_OUT_REQUEST,
    FETCH_SIGN_OUT_SUCCESS
} from '../actions/actions';

const AuthReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case FETCH_SIGN_UP_REQUEST:
        case FETCH_LOGIN_GOOGLE_REQUEST:
        case FETCH_LOGIN_EMAIL_REQUEST:
        case FETCH_PASSWORD_RECOVER_REQUEST:
        case FETCH_PASSWORD_UPDATE_REQUEST:
        case FETCH_SIGN_OUT_REQUEST:
            return {
                requesting: true
            };

        case FETCH_AUTH_SUCCESS:
            return {
                user: auth.currentUser
            };

        case FETCH_AUTH_FAILURE:
            return {
                error: action.error
            };

        case FETCH_PASSWORD_UPDATE_SUCCESS:
        case FETCH_PASSWORD_RECOVER_SUCCESS:
            return {
                recovered: true
            };

        case FETCH_SIGN_OUT_SUCCESS:

        default:
            return state;
    }
};

export default AuthReducer;
