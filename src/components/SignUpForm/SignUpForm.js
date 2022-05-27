import React from "react";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from "formik";

import { confirmPassword, emailSignUpValSchema, passwordSignUpValSchema } from "../../utils";

import styles from "./SignUpForm.module.css";

function SignUpForm() {
    /* const dispatch = useDispatch();
    const error = useSelector((state) => state.signInReducer.error); */

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
                onSubmit={ values => alert(values.email + "\n" + values.password) /* dispatch(signInEmailRequest(values)) */ }
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

                    {/* <div className={styles.authError}>{error ? handleAuthError(error) : ''}</div> */}

                    <button type='submit' className={`${styles.button} ${styles.submitButton}`}>Sign In</button>
                </Form>
            </Formik>
        </div>
    );
}

export default SignUpForm;