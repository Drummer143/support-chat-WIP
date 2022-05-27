import { call, put, takeLatest } from 'redux-saga/effects';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

import { authSuccess, authFailure, FETCH_LOGIN_EMAIL_REQUEST, FETCH_LOGIN_GOOGLE_REQUEST, FETCH_SIGN_UP_REQUEST } from '../actions/actions';
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
        yield console.log(error);
    }
}

function* watcherAuth() {
    yield takeLatest(FETCH_LOGIN_EMAIL_REQUEST, workerSignInWithEmail);
    yield takeLatest(FETCH_LOGIN_GOOGLE_REQUEST, workerSignInWithGoogle);
    yield takeLatest(FETCH_SIGN_UP_REQUEST, workerSignUpWithEmail);
}

export default watcherAuth;