import { call, put, takeLatest } from 'redux-saga/effects';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { signInEmailSuccess, signInEmailFailure, FETCH_LOGIN_EMAIL_REQUEST, FETCH_LOGIN_GOOGLE_REQUEST } from './../actions/actions';
import { auth, provider } from './../../firebase';

function* workerSignInWithEmail(action) {
    try {
        yield call(signInWithEmailAndPassword, auth, action.email, action.password);
        yield put(signInEmailSuccess());
    } catch (error) {
        yield put(signInEmailFailure(error));
    }
}

function* workerSignInWithGoogle() {
    try {
        yield call(signInWithPopup, auth, provider);
        yield put(signInEmailSuccess());
        yield alert('success');
    } catch (error) {
        yield put(signInEmailFailure(error));
    }
}

function* watcherSignInWithEmail() {
    yield takeLatest(FETCH_LOGIN_EMAIL_REQUEST, workerSignInWithEmail);
    yield takeLatest(FETCH_LOGIN_GOOGLE_REQUEST, workerSignInWithGoogle);
}

export default watcherSignInWithEmail;