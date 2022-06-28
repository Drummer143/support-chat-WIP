import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './ProfileSettings.module.css'
import { emailSchema, passwordSchema, confirmPasswordSchema } from './../../../utils';

function ProfileSettings() {
    const user = useSelector(state => state.authReducer.user);
    const validationSchema = Yup.object().shape({
        name: '',
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema
    });

    return (
        <div className={styles.wrapper}>
            <h2>Profile</h2>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => alert(JSON.stringify(values, '', 2))}
            >
                <Form className={styles.form}>
                    <h3>Update Name</h3>
                    <Field type='text' name='name' />

                    <h3>Update Email</h3>
                    <Field type='email' name='email' />
                    <ErrorMessage name='email' />

                    <h3>Update </h3>
                    <Field type='password' name='password' />
                    <ErrorMessage name='password' />

                    <Field type='password' name='confirmPassword' />
                    <ErrorMessage name='confirmPassword' />

                    <button type='submit'>Confirm Changes</button>
                </Form>
            </Formik>
        </div >
    );
}

export default ProfileSettings;