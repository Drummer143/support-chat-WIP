import React from "react";
import { useFormik } from "formik";

import styles from "./SignInForm.module.css";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.\nExample: example@mail.com';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

function SignInForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => { alert(JSON.stringify(values, null, 2)) }
    });
    
    return (
        <div className={ styles.wrapper }>
            <h1 className={styles.heading}>Sign In</h1>
            <form className={styles.form} onSubmit={formik.handleSubmit} >
                <div className={styles.input}>
                    <input name="email" type="text" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" className={styles.inputField} />
                    {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}
                </div>

                <div className={styles.input}>
                    <input name="password" type="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" className={styles.inputField} />
                    {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : null}
                </div>

                <button type='submit' className={styles.button}>Sign In</button>
            </form>
        </div>
    );
}

export default SignInForm;