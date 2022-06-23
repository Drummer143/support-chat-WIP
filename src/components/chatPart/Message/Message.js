import Moment from 'react-moment';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from './../../../firebase';

import styles from './Message.module.css';
import { useEffect, useState } from 'react';

function Message({ message }) {
    const [image, setImage] = useState('');
    const [imageWidth, setImageWidth] = useState('250');
    const [maxMessageWidth, setMaxMessageWidth] = useState('55%');

    const changeImageWidth = () => {
        if(imageWidth === '250') {
            setImageWidth('1000px');
            setMaxMessageWidth('none');
        } else {
            setImageWidth('250');
            setMaxMessageWidth('55%');
        }
    };

    useEffect(() => {
        if (message.image) {
            setImage(<button type='button' onClick={changeImageWidth}><img src={message.image} width={imageWidth} alt="something wrong with image" className={styles.image} /></button>);
        }
    }, [message.image, imageWidth]);

    return (
        <div className={`${styles.message} ${styles[message.writtenBy]}`} style={{ maxWidth: maxMessageWidth }}>
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
