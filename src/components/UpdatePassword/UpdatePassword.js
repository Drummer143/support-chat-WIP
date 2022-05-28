import React from 'react';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';

import { handleAuthError, passwordSignUpValSchema, confirmPassword } from '../../utils';
import { passwordUpdateRequest } from './../../redux/actions/actions';

import styles from './UpdatePassword.module.css';

function UpdatePassword() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.error);
    const recovered = useSelector((state) => state.authReducer.recovered);

    const [searchParams, setSearchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');

    return recovered ? (
        <Navigate to="/" />
    ) : (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Update password</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={Yup.object().shape({
                    password: passwordSignUpValSchema,
                    confirmPassword: confirmPassword
                })}
                onSubmit={(values) =>
                    dispatch(
                        passwordUpdateRequest({
                            password: values.password,
                            oobCode
                        })
                    )
                }
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field
                            name="password"
                            type="password"
                            placeholder="password"
                            className={styles.inputField}
                        ></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="password" />
                        </div>
                    </div>

                    <div className={styles.input}>
                        <Field
                            name="confirmPassword"
                            type="password"
                            placeholder="confirm password"
                            className={styles.inputField}
                        ></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="confirmPassword" />
                        </div>
                    </div>

                    <div className={styles.authError}>{error ? handleAuthError(error) : ''}</div>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default UpdatePassword;
