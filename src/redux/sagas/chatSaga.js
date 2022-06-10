/* import {
    ref,
    onValue,
    query,
    orderByChild,
    startAt,
    endAt,
} from 'firebase/database';
import { call, takeLatest, put } from 'redux-saga/effects';
import { database } from '../../firebase';
import { FETCH_GET_DATA_REQUEST, getDataSuccess } from './../actions/actions';

const getDialogs = (status) => {
    const dbRef = query(
        ref(database, 'dialogs/'),
        orderByChild('status'),
        startAt(status),
        endAt(status),
    );

    let array;
    const getData = () => {
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((child) => {
                let obj = child.val();
                obj.dialogId = child.key;
                if (array) {
                    array.push(obj);
                } else {
                    array = [obj];
                }
            });
        });
    };

    getData();

    console.log(array);

    return array;
};

function* workerGetData(action) {
    try {
        const data = yield getDialogs(action.status);
        yield put(getDataSuccess(data, action.status))
    } catch (error) {
        yield console.log(error);
    }
}

function* watcherChat() {
    yield takeLatest(FETCH_GET_DATA_REQUEST, workerGetData);
}

export default watcherChatSaga; */
