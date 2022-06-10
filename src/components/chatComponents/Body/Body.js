import InfiniteScroll from 'react-infinite-scroller';
import { database } from '../../../firebase';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';

import SearchBar from '../SearchBar/SearchBar';
import DialogListCell from '../DialogListCell/DialogListCell';
import { getDataSuccess } from './../../../redux/actions/actions';

import styles from './Body.module.css';
import { debounce } from 'lodash';

function Body() {
    const status = useSelector((state) => state.chatReducer.status);
    const [dialogs, setDialogs] = useState('');
    const [searchParams, setSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);
    const dispatch = useDispatch();

    const queryParams = {
        path: status === 'saved' ? 'saved' : 'status',
        status: status === 'saved' ? true : status
    };
    const dbRef = query(
        ref(database, 'dialogs/'),
        orderByChild(queryParams.path),
        startAt(queryParams.status),
        endAt(queryParams.status)
    );

    const getDialogs = () => {
        onValue(dbRef, (snapshot) => {
            let array;
            snapshot.forEach((child) => {
                let obj = child.val();
                obj.dialogId = child.key;
                if (array) {
                    array.push(obj);
                } else {
                    array = [obj];
                }
            });
            setDialogs(array);
            dispatch(getDataSuccess(array, status));
        });
    };

    useEffect(() => console.log("Full re-render"), []);

    useEffect(() => getDialogs(), [status]);

    useEffect(() => setCountOfDialogs(10), [searchParams, status]);

    const [searchParams2, setSearchParams2] = useState('');
    const debSetSearchParams2 = useCallback(debounce(setSearchParams2, 500), []);
    useEffect(() => debSetSearchParams2(searchParams), [searchParams]);

    const filterDialogs = () => {
        const inputFilter = (dialog) => {
            return (
                dialog.userName.toLowerCase().includes(searchParams2.toLowerCase()) ||
                dialog.messages.find((message) =>
                    message.content.toLowerCase().includes(searchParams2.toLowerCase())
                )
            );
        };

        return dialogs.filter((dialog) => inputFilter(dialog));
    };

    let results;
    if (dialogs) {
        results = filterDialogs();
        results = results.map((dialog) => <DialogListCell key={dialog.dialogId} dialog={dialog} />);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBar}>
                <SearchBar value={searchParams} setValue={setSearchParams} />
            </div>

            <div className={styles.list}>
                {Array.isArray(results) ? (
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
        </div>
    );
}

export default Body;
