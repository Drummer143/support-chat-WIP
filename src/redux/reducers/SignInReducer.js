import defaultState from './../defaultState';
import { FETCH_EMAIL_FAILURE, FETCH_EMAIL_SUCCESS, FETCH_EMAIL_REQUEST } from './../actions/actions';
import { auth } from './../../firebase';

const signInReducer = (state = defaultState, action) => {
    switch(action.type) {
        case FETCH_EMAIL_FAILURE:
            return { 
                requesting: false,
                user: false,
                error: action.error
            };
        case FETCH_EMAIL_REQUEST:
            return {
                requesting: true,
                user: false,
                error: ''
            };
        case FETCH_EMAIL_SUCCESS:
            return {
                requesting: false,
                user: auth.currentUser,
                error: '',
            };
        default: return state;
    };
}

export default signInReducer;