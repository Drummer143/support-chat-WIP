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
        <div className={styles.cell}>
            <p className={styles.name}>{props.dialog.userName}</p>
            <p className={styles.message}><strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}</p>
        </div>
    );
}

function Body(props) {
    let results = dialogs
        .filter(dialog => findChats(dialog, props.searchParams) && props.statusKey == dialog.status)
        .map(dialog => <ResultsCell dialog={dialog} />);

    if (!results[0]) {
        results = <p className={`${styles.cell} ${styles.empty}`}>The list of available chats is empty.
            Select another folder to the left of the list and also change the search terms.
            Or just wait for new chats to appear.
        </p>;
    }

    console.log(results)
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