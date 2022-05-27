import React from "react";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { signInEmailRequest, signInGoogleRequest } from "../../redux/actions/actions";
import { handleAuthError } from "../../utils";

import styles from "./SignInForm.module.css";

function SignInForm() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.signInReducer.error)
    const emailValSchema = Yup.string().email("Invalid address. Example: suppurt-chat@example.com").required("Required");
    const passwordValSchema = Yup.string().min(6, 'Must be 6 characters or more').max(20, 'Must be 20 characters or less').required("Required");

    return (
        <div className={ styles.wrapper }>
            <h1 className={styles.heading}>Welcome back!</h1>
            <Formik 
                initialValues={{ email: '', password: '', }}
                validationSchema={Yup.object().shape({
                    email: emailValSchema,
                    password: passwordValSchema
                })}
                onSubmit={ values => dispatch(signInEmailRequest(values)) }
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

                    <button type='submit' className={`${styles.button} ${styles.submitButton}`}>Sign In</button>

                    <h2>or</h2>

                    <button 
                        type='button' 
                        className={`${styles.button} ${styles.googleButton}`}
                        onClick={ () => dispatch(signInGoogleRequest()) }
                    ><FontAwesomeIcon icon={faGoogle} className={styles.icon}/> Login with Google</button>
                </Form>
            </Formik>
        </div>
    );
}

export default SignInForm;