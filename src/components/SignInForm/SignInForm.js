import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';

import styles from "./SignInForm.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from "../../redux/actions/actions";

const handleAuthError = (error) => {
    switch(error.code) {
        case "auth/user-not-found": return "ERROR: User with entered email was not found";
        case "auth/wrong-password": return "ERROR: Invalid password.";
        case "auth/too-many-requests": return "ERROR: Exceeded the number of login attempts. Check your email and password and try to login later.";
    }
}

function SignInForm() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.signInReducer.error)

    return (
        <div className={ styles.wrapper }>
            <h1 className={styles.heading}>Sign In</h1>
            <Formik 
                initialValues={{ email: '', password: '', }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Invalid address. Example: suppurt-chat@example.com").required("Required"),
                    password: Yup.string().min(6, 'Must be 6 characters or more').max(20, 'Must be 20 characters or less').required("Required")
                })}
                onSubmit={ values => { dispatch(signInRequest(values)) }}
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field name='email' type='text' placeholder='email' className={styles.inputField}></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <Field name='password' type='password' placeholder='password' className={styles.inputField}></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="password" />
                        </div>
                    </div>

                    <div className={styles.authError}>{error ? handleAuthError(error) : ''}</div>

                    <button type='submit' className={styles.button}>Sign In</button>
                </Form>
            </Formik>
        </div>
    );
}

export default SignInForm;