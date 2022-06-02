import { useState } from 'react';

import { dialogs } from './../../../data';

import styles from './Body.module.css';

const findChats = (dialog, searchParams) => {
    if (dialog.userName.toLowerCase().includes(searchParams.toLowerCase())) {
        return true;
    }
    return dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()));
}

function ResultsCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];

    return (
        <div className={styles.user}>
            <p className={styles.name}>{props.dialog.userName}</p>
            <p className={styles.message}><strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}</p>
        </div>
    );
}

function Body(props) {
    const results = dialogs.filter(dialog => findChats(dialog, props.searchParams)).map(dialog => <ResultsCell dialog={dialog} />);

    return (
        <div className={styles.wrapper}>
            <div className={styles.searchResults}>
                {results}
            </div>

            <div className={styles.chat}>
            </div>
        </div>
    );
}

export default Body;