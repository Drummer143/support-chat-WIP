import { all } from 'redux-saga/effects';

import watcherAuth from './authSaga';

function* rootSaga() {
    yield all([watcherAuth()]);
}

export default rootSaga;
