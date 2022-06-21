import Moment from 'react-moment';

import styles from './Message.module.css';

function Message({message}) {
    return (
        <div className={`${styles.message} ${styles[message.writtenBy]}`}>
            <p className={styles.text}>{message.content}</p>
            <p>
                <Moment fromNow className={styles.time}>
                    {message.timestamp}
                </Moment>
            </p>
        </div>
    );
}

export default Message;