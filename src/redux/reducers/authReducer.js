import defaultState from '../defaultState';
import { 
    FETCH_AUTH_FAILURE, 
    FETCH_AUTH_SUCCESS, 
    FETCH_LOGIN_EMAIL_REQUEST, 
    FETCH_LOGIN_GOOGLE_REQUEST, 
    FETCH_PASSWORD_RECOVER_REQUEST, 
    FETCH_PASSWORD_RECOVER_SUCCESS,
     FETCH_SIGN_OUT } from '../actions/actions';
import { auth } from '../../firebase';

const AuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_LOGIN_GOOGLE_REQUEST:
        case FETCH_LOGIN_EMAIL_REQUEST:
            return {
                requesting: true,
                user: false,
                error: ''
            };
            
        case FETCH_AUTH_SUCCESS:
            return {
                requesting: false,
                user: auth.currentUser,
                error: '',
            };

        case FETCH_AUTH_FAILURE:
            return {
                requesting: false,
                user: false,
                error: action.error
            };

        case FETCH_PASSWORD_RECOVER_SUCCESS:
            return {
                recovered: true
            };

        case FETCH_PASSWORD_RECOVER_REQUEST:
        case FETCH_SIGN_OUT:

        default: return state;
    };
}

export default AuthReducer;