import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { ref, onValue, query, orderByChild, startAt, endAt, off } from 'firebase/database';

import SearchBar from '../SearchBar/SearchBar';
import DialogListCell from '../DialogListCell/DialogListCell';
import { database } from '../../../firebase';
import { getDataSuccess, changeStatus } from './../../../redux/actions/actions';

import styles from './DialogsList.module.css';

function DialogsList() {
    const status = useSelector(state => state.chatReducer.status);
    const dispatch = useDispatch();
    const [dialogs, setDialogs] = useState('');
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [activeSearchParams, setActiveSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);

    const dbRef = ref(database, 'dialogs/');

    const getDialogs = () => {
        onValue(dbRef, snapshot => {
            let array;
            snapshot.forEach(child => {
                let obj = child.val();
                obj.dialogId = child.key;
                if (array) {
                    array.push(obj);
                } else {
                    array = [obj];
                }
            });
            setDialogs(array);
            dispatch(getDataSuccess(status, array));
        });
    };

    const filterDialogs = () => {
        const inputFilter = dialog => {
            return (
                dialog.userName.toLowerCase().includes(activeSearchParams.toLowerCase()) ||
                dialog.messages.find(message =>
                    message.content.toLowerCase().includes(activeSearchParams.toLowerCase())
                )
            );
        };

        const statusFilter = dialog => {
            if(status === 'saved') {
                return dialog.saved;
            } else {
                return dialog.status === status;
            }
        };
        
        return dialogs
            .filter(dialog => inputFilter(dialog) && statusFilter(dialog))
            .map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} />);
    };

    if (dialogs) {
        var results = filterDialogs();
    }

    useEffect(() => {
        getDialogs(dbRef);
    }, [status]);

    useEffect(() => setCountOfDialogs(10), [activeSearchParams, status]);

    useEffect(
        debounce(() => setActiveSearchParams(enteredSearchParams), 500),
        [enteredSearchParams]
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.panel}>
                {status === 'queue' ? (
                    <div className={styles.queue}>
                        Dialogs in queue: {dialogs.length}
                    </div>
                ) : (
                    <button onClick={() => dispatch(changeStatus('queue'))} className={styles.queueButton}>
                        Load queue
                    </button>
                )}

                <div>
                    <SearchBar value={enteredSearchParams} setValue={setEnteredSearchParams} />
                </div>
            </div>

            <div className={styles.list}>
                {results ? (
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={countOfDialogs < results.length}
                        loader={
                            <div className={styles.loadMoreField}>
                                <button
                                    onClick={() => setCountOfDialogs(countOfDialogs + 10)}
                                    className={styles.loadMore}
                                >
                                    Click here to load more
                                </button>
                            </div>
                        }
                        loadMore={getDialogs}
                    >
                        {results.slice(0, countOfDialogs)}
                    </InfiniteScroll>
                ) : (
                    <p className={styles.empty}>The list is empty.</p>
                )}
            </div>
        </div >
    );
}

export default DialogsList;
