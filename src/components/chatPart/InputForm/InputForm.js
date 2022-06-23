import { v4 } from 'uuid';
import { faPaperclip } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { ref as dRef, update } from 'firebase/database';
import { ref as sRef, uploadBytes } from 'firebase/storage';

import { database, storage } from '../../../firebase';

import styles from './InputForm.module.css';

const InputFileButton = ({ setImageInput, isDisabled }) => {
    return (
        <div className={styles.imageInput}>
            <input
                type='file'
                id='fileInput'
                multiple={true}
                onChange={e => {
                    console.log(e.target.files[0]);
                    setImageInput(e.target.files[0]);
                }
                }
                style={{ display: 'none' }}
            />
            <button
                type='button'
                onClick={() => document.getElementById('fileInput').click()}
                disabled={isDisabled}
                className={styles.imageButton}
            ><FontAwesomeIcon icon={faPaperclip} /></button>
        </div>
    );
}

function InputForm({ input, setInput, id, dialogId, status }) {
    const [localInput, setLocalInput] = useState(input);
    const [imageInput, setImageInput] = useState(null);

    useEffect(() => setLocalInput(input), [input]);

    const dbRef = dRef(database);

    const uploadImage = () => {
        const imageRef = sRef(storage, `d${dialogId}/m${id}/${imageInput.name}_${v4()}`);
        uploadBytes(imageRef, imageInput)
            .then(res => console.log(res));
    };

    const date = new Date();

    const sendMessage = () => {
        const message = {
            content: localInput,
            hasImages: imageInput ? `d${dialogId}/m${id}/` : '',
            timestamp: date.getTime(),
            writtenBy: 'client'
        };
        let updates = {};
        updates[`/dialogs/${dialogId}/messages/${id}`] = message;
        update(dbRef, updates);
        /* TODO: update operatorId */
    };

    const isDisabled = status === 'completed' ? true : false;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                if (localInput || imageInput) {
                    sendMessage();
                    setInput('');
                }
                if (imageInput) {
                    uploadImage();
                    setImageInput(null);
                }
            }}
            onReset={() => setInput('')}
            className={styles.wrapper}
            style={{ cursor: isDisabled ? 'not-allowed' : 'auto'}}
        >
            <div className={styles.inputField}>
                <textarea
                    name="input"
                    type="text"
                    /* onChange={formik.handleChange} */
                    onChange={e => setInput(e.target.value)}
                    value={localInput}
                    className={styles.textarea}
                    maxLength={1000}
                    placeholder='Write a message...'
                    disabled={isDisabled}
                />

                <InputFileButton setImageInput={setImageInput} isDisabled={isDisabled}/>
            </div>
            <div className={styles.buttons}>
                <button type="reset" className={`${styles.button} ${styles.clear}`} disabled={isDisabled}>
                    Clear
                </button>

                <button type="submit" className={`${styles.button} ${styles.submit}`} disabled={isDisabled}>
                    Send
                </button>
            </div>
        </form>

        /* <form
            onSubmit={e => {
                e.preventDefault();
                console.log(imageInput);
            }}
        >
            <InputFileButton setImageInput={setImageInput} />
            <button type='submit' onClick={uploadImage}>Upload</button>
        </form> */
    );
}

export default InputForm;
