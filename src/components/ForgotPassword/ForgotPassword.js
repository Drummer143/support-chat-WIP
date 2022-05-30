import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from 'reactstrap';

import { passwordRecoverRequest } from '../../redux/actions/actions';
import { handleAuthError, emailSignInValSchema } from './../../utils';

import styles from './ForgotPassword.module.css';

function ForgotPassword() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.recovered);
    return error ? (
        <Navigate to="/" />
    ) : (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Recover password</h1>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={Yup.object().shape({
                    email: emailSignInValSchema
                })}
                onSubmit={(values) => dispatch(passwordRecoverRequest(values))}
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field
                            name="email"
                            type="text"
                            placeholder="email"
                            className={styles.inputField}
                        ></Field>
                        <div className={styles.inputError}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>

                    <Fade in={error ? true : false} className={styles.authError}>{error ? handleAuthError(error) : ''}</Fade>

                    <button type="submit" className={styles.button}>
                        Send a link to recover password
                    </button>

                    <div className={styles.links}>
                        <a href="/sign-up" className={styles.link}>
                            Create account
                        </a>
                        <a href="/sign-in" className={styles.link}>
                            Login
                        </a>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default ForgotPassword;
