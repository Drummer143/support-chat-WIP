import styles from './InputForm.module.css';
import { useState, useEffect } from 'react';

function InputForm({ input, setInput }) {
    const [localInput, setLocalInput] = useState(input);

    useEffect(() => setLocalInput(input), [input]);

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                alert(input);
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
