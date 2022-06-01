import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from 'reactstrap';

import { signUpEmailRequest } from '../../../redux/actions/actions';
import {
    handleAuthError,
    emailSignUpValSchema,
    passwordSignUpValSchema,
    confirmPasswordSchema
} from '../../../utils';

import styles from './SignUpForm.module.css';

function SignUpForm() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.error);
    const validationSchema = Yup.object().shape({
        email: emailSignUpValSchema,
        password: passwordSignUpValSchema,
        confirmPassword: confirmPasswordSchema
    });

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Create an account</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => dispatch(signUpEmailRequest(values))}
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field
                            name="email"
                            type="text"
                            placeholder="email"
                            className={styles.inputField}
                        />
                        <div className={styles.inputError}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    <div className={styles.input}>
                        <Field
                            name="password"
                            type="password"
                            placeholder="password"
                            className={styles.inputField}
                        />
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
                        />
                        <div className={styles.inputError}>
                            <ErrorMessage name="confirmPassword" />
                        </div>
                    </div>

                    {/* error contains object if there is an error or empty string if there is no error 
                        but prop "in" in Fade attribute can accepts only boolean type 
                        so i added this condition */}
                    <Fade in={error ? true : false} className={styles.authError}>
                        {error && handleAuthError(error)}
                    </Fade>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Submit
                    </button>

                    <p className={styles.authRedirect}>
                        Already have an account? Login{' '}
                        <a href="/" className={styles.link}>
                            here
                        </a>
                    </p>
                </Form>
            </Formik>
        </div>
    );
}

export default SignUpForm;
