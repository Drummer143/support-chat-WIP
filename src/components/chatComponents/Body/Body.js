import {
    ref,
    onValue,
    update,
    query,
    orderByChild,
    startAt,
    endAt
} from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../../../firebase';
import { debounce } from 'lodash';

import DialogListCell from '../DialogListCell/DialogListCell';

import styles from './Body.module.css';

function Body(props) {
    const [dialogs, setDialogs] = useState('');

    const headDB = ref(database);
    const dbRef = query(
        ref(database, 'dialogs/' + props.statusKey),
        orderByChild('userNameInLowerCase'),
        startAt(props.searchParams.toLowerCase()),
        endAt(props.searchParams.toLowerCase() + '\uf8ff')
    );

    const getData = debounce(() => {
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
    }, 300);

    useEffect(() => getData(), [props.searchParams, props.statusKey]);

    const setNewStatus = (dialog, newStatus) => {
        let updates = {};
        updates['/dialogs/' + props.statusKey + '/' + dialog.dialogId] = null;
        const id = dialog.dialogId;
        delete dialog.id;
        updates['/dialogs/' + newStatus + '/' + id] = dialog;
        update(headDB, updates);
    };

    if (dialogs) {
        var results = dialogs.map((dialog) => (
            <DialogListCell key={dialog.dialogId} dialog={dialog} status={props.statusKey} setNewStatus={setNewStatus} />
        ));
    } else {
        results = <p className={styles.empty}>The list is empty.</p>;
    }

    return <div className={styles.wrapper}>{results}</div>;
}

export default Body;