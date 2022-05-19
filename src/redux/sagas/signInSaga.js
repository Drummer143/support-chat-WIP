import { call, put, takeLatest } from 'redux-saga/effects';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInSuccess, signInFailure, FETCH_EMAIL_REQUEST } from './../actions/actions';
import { auth } from './../../firebase';

function* workerSignInWithEmail(action) {
    debugger
    try {
        yield call(signInWithEmailAndPassword, auth, action.email, action.password);
        yield put(signInSuccess);
        console.log();
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* watcherSignInWithEmail() {
    yield takeLatest(FETCH_EMAIL_REQUEST, workerSignInWithEmail);
}

export default watcherSignInWithEmail;