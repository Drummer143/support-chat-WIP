import {
    ref,
    onValue,
    update,
    query,
    limitToFirst,
    orderByChild,
    orderByValue,
    orderByKey,
    startAt,
    endAt,
    equalTo,
    child,
    get
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../../../firebase';
import { debounce } from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

import DialogListCell from '../DialogListCell/DialogListCell';

import styles from './Body.module.css';

const filterChats = (dialogs, searchParams, statusKey) => {
    const inputFilter = (dialog) => {
        return dialog.messages.find((message) =>
            message.content.toLowerCase().includes(searchParams.toLowerCase())
        );
    };

    return dialogs.filter((dialog) => inputFilter(dialog));
};

function Body(props) {
    const [dialogs, setDialogs] = useState('');

    /* if (props.searchParams) { */
        var dbRef = query(
            ref(database, 'dialogs/' + props.statusKey),
            /* limitToFirst(countOfDialogs),  */ orderByChild('userName'),
            startAt(props.searchParams),
            endAt(props.searchParams + '\uf8ff')
        );
    /* } else {
        var dbRef = query(
            ref(database, 'dialogs/' + props.statusKey),
            /* limitToFirst(countOfDialogs),   orderByChild('userName')
        );
    } */

    let array;
    const getData = debounce(() => {
        onValue(dbRef, (snapshot) => {
            snapshot.forEach((child) => {
                if (array) {
                    array.push(child.val());
                } else {
                    array = [child.val()];
                }
            });
            setDialogs(array);
        });
    }, 1000);

    useEffect(() => getData(), [dialogs, props.searchParams]);

    const setNewStatus = (dialogId, newStatus) => {
        const pos = dialogs.findIndex((dialog) => dialog.dialogId == dialogId);
        let updates = {};
        updates['/dialogs/' + pos + '/status/'] = newStatus;
        update(dbRef, updates);
    };

    if (dialogs) {
        var results = dialogs.map((dialog) => (
            <DialogListCell key={dialog.dialogId} dialog={dialog} setNewStatus={setNewStatus} />
        ));
    } else {
        results = <p className={styles.empty}>The list is empty.</p>;
    }

    return <div className={styles.wrapper}>{results}</div>;
}

export default Body;
