import { all } from 'redux-saga/effects';

import watcherAuth from './authSaga';
import watcherChatSaga from './chatSaga';

function* rootSaga() {
    yield all([watcherAuth()/* , watcherChatSaga() */]);
}

export default rootSaga;
