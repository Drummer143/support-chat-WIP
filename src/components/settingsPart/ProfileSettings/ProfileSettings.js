import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { updateEmail, updateProfile, updatePassword } from 'firebase/auth';

import styles from './ProfileSettings.module.css'
import { emailSchema, passwordSchema, confirmPasswordSchema } from './../../../utils';
import { useState } from 'react';
import { auth } from './../../../firebase';
import { updateUser } from '../../../redux/actions/actions';

function ProfileSettings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema
    });

    const handleSubmit = ({ name, email, password }) => {
        if (name && user.displayName !== name) {
            updateProfile(auth.currentUser, { displayName: name })
                .then(() => dispatch(updateUser(auth.currentUser)))
                .then(() => setIsFinished(prev => ['green', prev[1], prev[2]]))
                .catch(error => alert(error));
        }
        if (email && user.email !== email) {
            updateEmail(auth.currentUser, email)
                .then(() => dispatch(updateUser(auth.currentUser)))
                .then(() => setIsFinished(prev => [prev[0], 'green', prev[2]]))
                .catch(error => alert(error));
        }
        if (password) {
            updatePassword(auth.currentUser, password)
                .then(() => dispatch(updateUser(auth.currentUser)))
                .then(() => setIsFinished(prev => [prev[0], prev[1], 'green']))
                .catch(error => alert(error));
        }
    };

    const [isFinished, setIsFinished] = useState(['white', 'white', 'white']);

    return (
        <div className={styles.wrapper}>
            <h2>Profile</h2>

            <Formik
                initialValues={{
                    name: user.displayName || '',
                    email: user.email || '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => handleSubmit(values)}
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <h3>Update Name</h3>
                        <Field type='text' name='name' style={{ outline: `solid 2px ${isFinished[0]}` }} />
                        <p><ErrorMessage name='name' /></p>
                    </div>

                    <div className={styles.input}>
                        <h3>Update Email</h3>
                        <Field type='email' name='email' />
                        <p><ErrorMessage name='email' /></p>
                    </div>

                    <div className={styles.input}>
                        <h3>Update Password</h3>
                        <Field type='password' name='password' />
                        <p><ErrorMessage name='password' /></p>

                        <Field type='password' name='confirmPassword' />
                        <p><ErrorMessage name='confirmPassword' /></p>
                    </div>

                    <button type='submit' >Confirm Changes</button>
                </Form>
            </Formik>
        </div >
    );
}

export default ProfileSettings;