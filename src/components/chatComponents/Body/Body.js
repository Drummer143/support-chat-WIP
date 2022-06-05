import { ref, child, get, onValue, update } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { debounce } from "lodash";

import DialogListCell from '../DialogListCell/DialogListCell';

import styles from './Body.module.css';

const filterChats = (dialogs, searchParams, statusKey) => {
    const inputFilter = (dialog) => {
        return (
            dialog.userName.toLowerCase().includes(searchParams.toLowerCase()) ||
            dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()))
        );
    }

    return dialogs.filter(dialog => inputFilter(dialog) && statusKey === dialog.status);
}

function Body(props) {
    const [dialogs, setDialogs] = useState('');
    const dbRef = ref(database);

    const getData = debounce(() => {
        get(child(dbRef, "/dialogs/")).then((snapshot) => {
            if (snapshot.exists()) {
                setDialogs(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }, 500)

    useEffect(() => getData(), [dialogs]);

    const setNewStatus = (dialogId, newStatus) => {
        const pos = dialogs.findIndex(dialog => dialog.dialogId == dialogId)
        dialogs[pos].status = newStatus;
        console.log(dialogs[pos].status);
        let updates = {};
        updates['/dialogs/' + pos + '/status/'] = newStatus
        update(dbRef, updates);
    }

    let results;
    if (dialogs) {
        results = filterChats(dialogs, props.searchParams, props.statusKey);

        if (results.length === 0) {
            results = <p className={styles.empty}>The list is empty.</p>;
        } else {
            results = results.map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog} setNewStatus={setNewStatus} />);
        }
    }

    return (
        <div className={styles.wrapper}>
            {results}
        </div>
    );
}

export default Body;