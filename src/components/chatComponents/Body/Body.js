import { useState } from 'react';

import { dialogs } from './../../../data';

import styles from './Body.module.css';

const findChats = (dialog, searchParams) => {
    if (dialog.userName.toLowerCase().includes(searchParams.toLowerCase())) {
        return true;
    }
    return dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()));
}

function Body(props) {
    const results = dialogs.filter(dialog => findChats(dialog, props.searchParams)).map(dialog => <p key={dialog.dialogId} className={styles.dialog}>{dialog.userName}</p>);

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchResults}>{results}</div>
        </div>
    );
}

export default Body;