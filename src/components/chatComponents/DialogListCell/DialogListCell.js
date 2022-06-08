import { useState } from 'react';
import Moment from 'react-moment';
import styles from './DialogListCell.module.css';

function DialogListCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];

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
            </div>
        </div>
    );
}

export default DialogListCell;
