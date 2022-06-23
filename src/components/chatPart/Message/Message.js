import Moment from 'react-moment';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from './../../../firebase';

import styles from './Message.module.css';
import { useEffect, useState } from 'react';

function Message({ message }) {
    const [image, setImage] = useState('');

    useEffect(() => {
        if (message.image) {
            setImage(<img src={message.image} width="250" alt="something wrong with image" className={styles.image} />);
        }
    }, [message.image]);

    return (
        <div className={`${styles.message} ${styles[message.writtenBy]}`}>
            {message.content ? <p className={styles.text}>{message.content}</p> : null}
            {image/*  ? (
                <img
                    src={image}
                    width="250"
                    alt="something wrong with image"
                    style={{ 'border-radius': '5px' }}
                />
            ) : null */}
            <p>
                <Moment fromNow className={styles.time}>
                    {message.timestamp}
                </Moment>
            </p>
        </div>
    );
}

export default Message;
