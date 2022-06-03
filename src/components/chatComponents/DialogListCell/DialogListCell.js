
import styles from './DialogListCell.module.css';

function DialogListCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];

    return (
        <div className={styles.wrapper}>
            <p className={styles.name}>{props.dialog.userName}</p>
            <p className={styles.message}><strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}</p>
        </div>
    );
}

export default DialogListCell;