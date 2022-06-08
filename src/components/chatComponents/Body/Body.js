import {
    ref,
    onValue,
    update,
    query,
    orderByChild,
    startAt,
    endAt,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../../../firebase';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import DialogListCell from '../DialogListCell/DialogListCell';
import SearchBar from '../SearchBar/SearchBar';

import styles from './Body.module.css';
import { useSelector } from 'react-redux';

function Body(props) {
    const status = useSelector(state => state.chatReducer.status);
    const [dialogs, setDialogs] = useState('');
    const [searchParams, setSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(10);

    const headDB = ref(database);
    const dbRef = query(
        ref(database, 'dialogs/'),
        orderByChild('status'),
        startAt(status),
        endAt(status),
    );

    const getDialogs = debounce(() => {
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
        });
    }, 500);

    useEffect(() => {
        getDialogs();
        setCountOfDialogs(10);
    }, [searchParams, status]);

    const setNewStatus = (dialogId, newStatus) => {
        let updates = {};
        updates['/dialogs/' + dialogId + '/status/'] = newStatus;
        update(headDB, updates);
    };

    const filterDialogs = () => {
        const inputFilter = (dialog) => {
            return (
                dialog.userName.toLowerCase().includes(searchParams.toLowerCase()) ||
                dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()))
            );
        }

        return dialogs.filter(dialog => inputFilter(dialog));
    }

    let results;
    if (dialogs) {
        results = filterDialogs(dialogs, props.searchParams, props.statusKey);
        results = results.map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} setNewStatus={setNewStatus} />);
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
                                <button onClick={() => setCountOfDialogs(countOfDialogs + 10)} className={styles.loadMore}>Click here to load more</button>
                            </div>
                        }
                        loadMore={getDialogs}
                    >
                        {results.slice(0, countOfDialogs)}
                    </InfiniteScroll>
                ) : <p className={styles.empty}>The list is empty.</p>
                }
            </div>
        </div>
    );
}

export default Body;