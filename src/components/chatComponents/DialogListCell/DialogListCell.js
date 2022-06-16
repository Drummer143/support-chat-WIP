import Moment from 'react-moment';
import { NavLink } from 'react-router-dom';

import useButtons from './useButtons';

import styles from './DialogListCell.module.css';

function DialogListCell({dialog}) {
    const lastMessage = dialog.messages[dialog.messages.length - 1];
    const currButtonSet = useButtons(dialog);

    return (
        <div className={styles.wrapper}>
            <NavLink to={'/main/dialog/' + dialog.dialogId} className={styles.dialogInfo}>
                <div className={styles.head}>
                    <p className={styles.text}>{dialog.userName}</p>
                    <p className={styles.text}>
                        Last message was sent{' '}
                        <Moment fromNow className={styles.time}>
                            {lastMessage.timestamp}
                        </Moment>
                    </p>
                </div>

                <p className={styles.message}>
                    <strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}
                </p>
            </NavLink>

            <div className={styles.buttons}>
                {currButtonSet.first}
                {currButtonSet.second}
            </div>
        </div>
    );
}

export default DialogListCell;
