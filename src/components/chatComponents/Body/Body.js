import {
    ref,
    onValue,
    update,
    query,
    orderByChild,
    startAt,
    endAt,
    limitToFirst
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../../../firebase';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import DialogListCell from '../DialogListCell/DialogListCell';
import SearchBar from '../SearchBar/SearchBar';

import styles from './Body.module.css';

function Body(props) {
    const [dialogs, setDialogs] = useState('');
    const [searchParams, setSearchParams] = useState('');
    const [countOfDialogs, setCountOfDialogs] = useState(5);

    const headDB = ref(database);
    const dbRef = query(
        ref(database, 'dialogs/'),
        orderByChild('status'),
        startAt(props.statusKey),
        endAt(props.statusKey),
        limitToFirst(countOfDialogs)
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

    useEffect(() => getDialogs(), [searchParams, props.statusKey]);

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

        if (results.length === 0) {
            results = <p className={styles.empty}>The list is empty.</p>;
        } else {
            results = results.map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} setNewStatus={setNewStatus} />);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchBar}>
                <SearchBar value={searchParams} setValue={setSearchParams} />
            </div>

            <div className={styles.list}>
                <InfiniteScroll
                    pageStart={0}
                    hasMore={dialogs.length % 5 === 0}
                    loader={<button onClick={() => setCountOfDialogs(countOfDialogs + 5)} >Click here to load more</button>}
                    loadMore={getDialogs}
                >
                    {results}
                </InfiniteScroll>
            </div>
        </div>);
}

export default Body;