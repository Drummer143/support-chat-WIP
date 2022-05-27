import { auth } from './../firebase';

export const defaultState = {
    requesting: false,
    user: auth.currentUser ? auth : false,
    error: ''
}