import { call, put, takeLatest } from 'redux-saga/effects';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

import { 
    authSuccess, 
    authFailure,
    signOutSuccess,
    passwordRecoverSuccess,
    FETCH_LOGIN_EMAIL_REQUEST, 
    FETCH_LOGIN_GOOGLE_REQUEST, 
    FETCH_SIGN_UP_REQUEST, 
    FETCH_SIGN_OUT_REQUEST, 
    FETCH_PASSWORD_RECOVER_REQUEST
} from '../actions/actions';
import { auth, provider } from '../../firebase';

function* workerSignInWithEmail(action) {
    try {
        yield call(signInWithEmailAndPassword, auth, action.email, action.password);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignInWithGoogle() {
    try {
        yield call(signInWithPopup, auth, provider);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignUpWithEmail(action) {
    try {
        yield call(createUserWithEmailAndPassword, auth, action.email, action.password);
        yield put(authSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* workerSignOut() {
    yield auth.signOut();
    yield put(signOutSuccess());
}

function* workerRecoverPassword(action) {
    debugger
    try {
        yield call(sendPasswordResetEmail, auth, action.email);
        yield put(passwordRecoverSuccess());
    } catch (error) {
        yield put(authFailure(error));
    }
}

function* watcherAuth() {
    yield takeLatest(FETCH_LOGIN_EMAIL_REQUEST, workerSignInWithEmail);
    yield takeLatest(FETCH_LOGIN_GOOGLE_REQUEST, workerSignInWithGoogle);
    yield takeLatest(FETCH_SIGN_UP_REQUEST, workerSignUpWithEmail);
    yield takeLatest(FETCH_SIGN_OUT_REQUEST, workerSignOut);
    yield takeLatest(FETCH_PASSWORD_RECOVER_REQUEST, workerRecoverPassword);
}

export default watcherAuth;