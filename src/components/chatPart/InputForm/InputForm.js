import styles from './InputForm.module.css';
import { useState, useEffect } from 'react';

import { ref } from 'firebase/database';
import { update } from 'firebase/database';

import { database } from '../../../firebase';

function InputForm({ input, setInput, id, dialogId }) {
    const [localInput, setLocalInput] = useState(input);

    useEffect(() => setLocalInput(input), [input]);

    const headDB = ref(database);

    const date = new Date();
    
    const sendMessage = () => {
        const message = {
            content: localInput,
            timestamp: date.getTime(),
            writtenBy: 'operator'
        };
        let updates = {};
        updates[`/dialogs/${dialogId}/messages/${id}/`] = message;
        update(headDB, updates);
        /* TODO: update operatorId */
    };

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                sendMessage();
                setInput('');
            }}
            onReset={() => setInput('')}
            className={styles.wrapper}
        >
            <textarea
                name="input"
                type="text"
                /* onChange={formik.handleChange} */
                onChange={e => setInput(e.target.value)}
                value={localInput}
                className={styles.inputField}
                maxLength={1000}
            />

            <div className={styles.buttons}>
                <button type="reset" className={`${styles.button} ${styles.clear}`}>
                    Clear
                </button>

                <button type="submit" className={`${styles.button} ${styles.submit}`}>
                    Send
                </button>
            </div>
        </form>
    );
}

export default InputForm;
