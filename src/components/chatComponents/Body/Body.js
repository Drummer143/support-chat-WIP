import { ref, child, get, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { debounce, filter } from "lodash";

import DialogListCell from '../DialogListCell/DialogListCell';

import styles from './Body.module.css';

const findChats = (dialog, searchParams) => {
    if (dialog.userName.toLowerCase().includes(searchParams.toLowerCase())) {
        return true;
    }
    return dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()));
}

const filterDialogs = (dialogs, searchParams, statusKey) => {
    let results;

    if (dialogs) {
        if (statusKey == "all") {
            results = dialogs.filter(dialog => findChats(dialog, searchParams))
        } else {
            results = dialogs.filter(dialog => findChats(dialog, searchParams) && statusKey === dialog.status)
        }
        results = results.map(dialog => <DialogListCell key={dialog.dialogId} dialog={dialog}/>);
    }
    
    return results;
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

    let results = filterDialogs(dialogs, props.searchParams, props.statusKey);

    return (
        <div className={styles.wrapper}>
            {results}
        </div>
    );
}

export default Body;