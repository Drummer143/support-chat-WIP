import { useState } from 'react';
import Moment from 'react-moment';
import styles from './DialogListCell.module.css';

function DialogListCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];

    const buttons = {
        save: <button className={`${styles.button} ${styles.save}`} onClick={() => props.setNewStatus(props.dialog.dialogId, 'saved')}>Save dialog</button>,
        placeholder: <div className={styles.placeholder}></div>
    }

    let currButtonSet;
    switch (props.dialog.status) {
        case 'active': {
            currButtonSet = {
                first: buttons.placeholder,
                second: buttons.save
            };
            break;
        }
        case 'completed': {
            currButtonSet = {
                first: buttons.placeholder,
                second: buttons.save
            };
            break;
        }

        default: {
            currButtonSet = {
                first: buttons.placeholder,
                second: buttons.placeholder
            };
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.dialogInfo}>
                <div className={styles.head}>
                    <p className={styles.text}>{props.dialog.userName}</p>
                    <p className={styles.text}>
                        Last message was sent{' '}
                        <Moment fromNow className={styles.time}>
                            {props.dialog.messages[props.dialog.messages.length - 1].timestamp}
                        </Moment>
                    </p>
                </div>

                <p className={styles.message}>
                    <strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}
                </p>
            </div>

            <div className={styles.buttons}>
                {currButtonSet.first}
                {currButtonSet.second}
            </div>
        </div>
    );
}

export default DialogListCell;
