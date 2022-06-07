import Moment from 'react-moment';
import styles from './DialogListCell.module.css';

function DialogListCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];
    const buttons = {
        saveButton: {
            text: 'Save dialog',
            onClick: () => props.setNewStatus(props.dialog.dialogId, 'saved')
        },
        completeButton: {
            text: 'Complete dialog',
            onClick: () => props.setNewStatus(props.dialog.dialogId, 'completed')
        },
        deleteFromSavedButton: {
            text: 'Delete from saved',
            onClick: () => props.setNewStatus(props.dialog.dialogId, 'active')
        }
    };

    let currButtonsSet;
    switch (props.dialog.status) {
        case 'active': {
            currButtonsSet = ['completeButton', 'saveButton'];
            break;
        }
        case 'saved': {
            currButtonsSet = ['completeButton', 'deleteFromSavedButton'];
            break;
        }
        default: {
            currButtonsSet = null;
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

            {currButtonsSet && (
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={buttons[currButtonsSet[0]].onClick}>
                        {buttons[currButtonsSet[0]].text}
                    </button>
                    <button className={styles.button} onClick={buttons[currButtonsSet[1]].onClick}>
                        {buttons[currButtonsSet[1]].text}
                    </button>
                </div>
            )}
        </div>
    );
}

export default DialogListCell;
