import { useFormik } from "formik";

import styles from './InputForm.module.css';


function InputForm() {
    const formik = useFormik({
        initialValues: { text: '' },
        onSubmit: ({text}) => text ? alert(text) : null
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            onReset={formik.resetForm}
            className={styles.wrapper}
        >

            <textarea
                name='text' type='text'
                onChange={formik.handleChange}
                className={styles.inputField}
            />

            <div className={styles.buttons}>
                <button
                    type='reset'
                    className={`${styles.button} ${styles.clear}`}
                >
                    Clear
                </button>

                <button
                    type="submit"
                    className={`${styles.button} ${styles.submit}`}
                >
                    Send
                </button>
            </div>
        </form>
    );
}

export default InputForm