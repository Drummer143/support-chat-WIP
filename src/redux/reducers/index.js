import { combineReducers } from 'redux';

import signInReducer from './SignInReducer';

export const rootReducer = combineReducers({ signInReducer });