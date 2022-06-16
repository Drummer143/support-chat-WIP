import InfiniteScroll from 'react-infinite-scroller';
import { debounce } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import useGetData from './useGetData';
import DialogListCell from '../DialogListCell/DialogListCell';
import { changeStatus } from './../../../redux/actions/actions';

import styles from './DialogsList.module.css';

function DialogsList() {
    const status = useSelector(state => state.chatReducer.status);
    const dispatch = useDispatch();
    const [enteredSearchParams, setEnteredSearchParams] = useState('');
    const [activeSearchParams, setActiveSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);
    const dialogs = useGetData(activeSearchParams);

    useEffect(() => setCountOfDialogs(10), [activeSearchParams, status]);

    useEffect(
        debounce(() => setActiveSearchParams(enteredSearchParams), 500),
        [enteredSearchParams]
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.panel}>
                {status === 'queue' ? (
                    <div className={styles.queue}>Dialogs in queue: {dialogs.length}</div>
                ) : (
                    <button
                        onClick={() => dispatch(changeStatus('queue'))}
                        className={styles.queueButton}
                    >
                        Load queue
                    </button>
                )}

                <SearchBar value={enteredSearchParams} setValue={setEnteredSearchParams} />
            </div>

            <div className={styles.list}>
                {dialogs.length ? (
                    <InfiniteScroll
                        pageStart={0}
                        hasMore={countOfDialogs < dialogs.length}
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
                    >
                        {dialogs.slice(0, countOfDialogs).map(dialog => (
                            <DialogListCell key={dialog.dialogId} dialog={dialog} />
                        ))}
                    </InfiniteScroll>
                ) : (
                    <p className={styles.empty}>The list is empty.</p>
                )}
            </div>
        </div>
    );
}

export default DialogsList;
