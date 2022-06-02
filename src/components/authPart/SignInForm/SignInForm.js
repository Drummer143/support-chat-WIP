import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Fade } from 'reactstrap';

import { signInEmailRequest, signInGoogleRequest } from '../../../redux/actions/actions';
import { handleAuthError, emailSignInValSchema, passwordSignInValSchema } from '../../../utils';
import styles from './SignInForm.module.css';

function SignInForm() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.error);
    const validationSchema = Yup.object().shape({
        email: emailSignInValSchema,
        password: passwordSignInValSchema
    });

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Welcome back!</h1>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => dispatch(signInEmailRequest(values))}
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

                        <p className={styles.passwordRecover}>
                            <a href="/forgot-password" className={styles.link}>
                                Forgot password?
                            </a>
                        </p>
                    </div>

                    {/* error contains object if there is an error or empty string if there is no error 
                        but prop "in" in Fade attribute can accepts only boolean type 
                        so i added this condition */}
                    <Fade in={error ? true : false} className={styles.authError}>
                        {error && handleAuthError(error)}
                    </Fade>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Sign In
                    </button>

                    <h2>or</h2>

                    <button
                        type="button"
                        className={`${styles.button} ${styles.googleButton}`}
                        onClick={() => dispatch(signInGoogleRequest())}
                    >
                        <FontAwesomeIcon icon={faGoogle} className={styles.icon} /> Login with
                        Google
                    </button>

                    <p className={styles.authRedirect}>
                        Don't have an account? Create it
                        <a href="/sign-up" className={styles.link}>
                            here
                        </a>
                    </p>
                </Form>
            </Formik>
        </div>
    );
}

export default SignInForm;
