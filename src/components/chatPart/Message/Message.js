import Moment from 'react-moment';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from './../../../firebase';

import styles from './Message.module.css';
import { useEffect, useState } from 'react';

function Message({ message }) {
    const [ imageUrl, setImageUrl ] = useState(null);
    const [ image, setImage ] = useState('');
    const path = message.hasImages;

    useEffect(() => {
        if(path) {
            const imageRef = ref(storage, path);
            listAll(imageRef).then(res => getDownloadURL(res.items[0])).then(url => setImage(url));
        }
    },[])

    return (
        <div className={`${styles.message} ${styles[message.writtenBy]}`}>
            <p className={styles.text}>{message.content}</p>
            {image ? <img src={image} width='250' alt='something wrong with image' style={{ 'border-radius': '10px' }} /> : null}
            <p>
                <Moment fromNow className={styles.time}>
                    {message.timestamp}
                </Moment>
            </p>
        </div>
    );
}

export default Message;
