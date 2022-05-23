import { call, put, takeLatest } from 'redux-saga/effects';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInSuccess, signInFailure, FETCH_EMAIL_REQUEST } from './../actions/actions';
import { auth } from './../../firebase';

function* workerSignInWithEmail(action) {
    try {
        yield call(signInWithEmailAndPassword, auth, action.email, action.password);
        yield put(signInSuccess());
        yield alert('Success');
    } catch (error) {
        yield put(signInFailure(error));
        yield alert(error);
    }
}

function* watcherSignInWithEmail() {
    yield takeLatest(FETCH_EMAIL_REQUEST, workerSignInWithEmail);
}

export default watcherSignInWithEmail;