import React from "react";
import { useFormik } from "formik";

import styles from "./SignUpForm.css";

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
}

function SignUpForm() {
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
                <input name="email" type="text" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />
                {formik.errors.email ? <div className={styles.error}>{formik.errors.email}</div> : null}

                <input name="password" type="password" onChange={formik.handleChange} value={formik.values.password} placeholder="Password" />
                {formik.errors.password ? <div className={styles.error}>{formik.errors.password}</div> : null}

                <button type='submit'>Sign In</button>
            </form>
        </div>
    );
}

export default SignUpForm;