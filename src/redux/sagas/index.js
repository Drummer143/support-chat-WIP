import {all} from 'redux-saga/effects';
import watcherSignInWithEmail from './signInSaga';

function* rootSaga() {
    yield all([ watcherSignInWithEmail() ]);
}

export default rootSaga;