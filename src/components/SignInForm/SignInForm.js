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
    const error = useSelector((state) => state.authReducer.error)

    const emailSignInValSchema = Yup.string().required("This field is required");
    const passwordSignInValSchema = Yup.string().required("This field is required");

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Welcome back!</h1>
            <Formik 
                initialValues={{ email: '', password: '', }}
                validationSchema={Yup.object().shape({
                    email: emailSignInValSchema,
                    password: passwordSignInValSchema
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

                    <p className={styles.authRedirect}>Don't have an account? Create it <a href="sign-up" target="_self" className={styles.link}>here</a></p>
                </Form>
            </Formik>
        </div>
    );
}

export default SignInForm;