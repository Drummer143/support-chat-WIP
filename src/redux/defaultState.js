import { auth } from './../firebase';

const defaultState = {
    requesting: false,
    user: auth.currentUser ? auth : false,
    error: ''
}

export default defaultState;