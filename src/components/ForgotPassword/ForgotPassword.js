import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { passwordRecoverSuccess } from "../../redux/actions/actions";
import { handleAuthError } from './../../utils';

import styles from "./ForgotPassword.module.css";

function ForgotPassword() {
    const dispatch = useDispatch();
    const error = useSelector(state => state.authReducer.recovered);
    const emailSignInValSchema = Yup.string().required("This field is required");

    return error ? (<Navigate to="/recover-info" />) : (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Recover password</h1>
            <Formik 
                initialValues={{ email: '' }}
                validationSchema={Yup.object().shape({
                    email: emailSignInValSchema
                })}
                onSubmit={ values => dispatch(passwordRecoverSuccess(values)) }
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field name='email' type='text' placeholder='email' className={styles.inputField}></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    <div className={styles.authError}>{error ? handleAuthError(error) : ''}</div>

                    <button type='submit' className={styles.button}>Send a link to recover password</button>

                    <div className={styles.links}>
                        <a href="sign-up" target='_self' className={styles.link}>Create account</a>
                        <a href="sign-in" target="_self" className={styles.link}>Login</a>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default ForgotPassword;