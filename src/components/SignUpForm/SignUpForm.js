import React from "react";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch, useSelector } from 'react-redux';

import { signUpEmailRequest } from "../../redux/actions/actions";
import { handleAuthError } from './../../utils';

import styles from "./SignUpForm.module.css";

function SignUpForm() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.error);

    const emailSignUpValSchema = Yup.string().email("Invalid address. Example: suppurt-chat@example.com").required("This field is required");
    const passwordSignUpValSchema = Yup.string().min(6, 'Must be 6 characters or more').max(20, 'Must be 20 characters or less').required("This field is required");
    const confirmPassword = Yup.string().oneOf([Yup.ref('password')], "Passwords does not match").required("This field is required");

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Create an account</h1>
            <Formik 
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={Yup.object().shape({
                    email: emailSignUpValSchema,
                    password: passwordSignUpValSchema,
                    confirmPassword: confirmPassword
                })}
                onSubmit={ values => dispatch(signUpEmailRequest(values)) }
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

                    <div className={styles.input}>
                        <Field name='confirmPassword' type='password' placeholder='confirm password' className={styles.inputField}></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="confirmPassword" />
                        </div>
                    </div>

                    <div className={styles.authError}>{error ? handleAuthError(error) : ''}</div>

                    <button type='submit' className={`${styles.button} ${styles.submitButton}`}>Submit</button>

                    <p className={styles.authRedirect}>Already have an account? Login <a href="sign-in" target="_self" className={styles.link}>here</a></p>
                </Form>
            </Formik>
        </div>
    );
}

export default SignUpForm;