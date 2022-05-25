import { combineReducers } from 'redux';

import signInReducer from './SignInReducer';

const rootReducer = combineReducers({ signInReducer });

export default rootReducer;