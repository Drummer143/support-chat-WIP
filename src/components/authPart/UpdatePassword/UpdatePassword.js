import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Fade } from 'reactstrap';

import { handleAuthError, passwordSignUpValSchema, confirmPasswordSchema } from '../../../utils';
import { passwordUpdateRequest } from '../../../redux/actions/actions';

import styles from './UpdatePassword.module.css';

function UpdatePassword() {
    const dispatch = useDispatch();
    const error = useSelector((state) => state.authReducer.error);
    const recovered = useSelector((state) => state.authReducer.recovered);

    const [searchParams, setSearchParams] = useSearchParams();
    const oobCode = searchParams.get('oobCode');
    const validationSchema = Yup.object().shape({
        password: passwordSignUpValSchema,
        confirmPassword: confirmPasswordSchema
    });

    return recovered ? (
        <Navigate to="/update-password-redirect" />
    ) : (
        <div className={styles.wrapper}>
            <h1 className={styles.heading}>Update password</h1>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '' }}
                validationSchema={ validationSchema }
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

                    { /* error contains object if there is an error or empty string if there is no error 
                        but prop "in" in Fade attribute can accepts only boolean type 
                        so i added this condition */ }
                    <Fade in={error ? true : false} className={styles.authError}>{error && handleAuthError(error)}</Fade>

                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
}

export default UpdatePassword;
