import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';

import styles from './ProfileSettings.module.css'
import { emailSchema, passwordSchema, confirmPasswordSchema } from './../../../utils';
import { updateNameRequest, updatePasswordRequest, updateEmailRequest } from './../../../redux/actions/actions';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth } from './../../../firebase';

function ProfileSettings() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema
    });

    const reAuthentication = (updateDataFunction) => {
        const credential = EmailAuthProvider.credential(user.email, 'Q1w2e3r4');
        reauthenticateWithCredential(auth.currentUser, credential)
            .then(updateDataFunction)
            .catch(error => alert(error));
    };

    const handleSubmit = (e, field, value) => {
        e.preventDefault();
        if (value) {
            switch (field) {
                case 'name':
                    if (user.displayName !== value) {
                        dispatch(updateNameRequest(value));
                    } else {
                        alert('This name is already in use');
                    }
                    break;

                case 'email':
                    if (user.email !== value) {
                        reAuthentication(() => dispatch(updateEmailRequest(value)));
                    } else {
                        alert('This email is already in use');
                    }
                    break;

                case 'password':
                    reAuthentication(() => dispatch(updatePasswordRequest(value)));
                    break;

                default: alert('Something wrong with site. Contact technical support.');
            }
        } else {
            alert('empty');
        }
    };

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
            >
                {formik => (
                    <>
                        <Form className={styles.form} onSubmit={e => handleSubmit(e, 'name', formik.values.name)}>
                            <h3>Update Name</h3>
                            <Field type='text' name='name' />
                            <p><ErrorMessage name='name' /></p>
                        </Form>

                        <Form className={styles.form} onSubmit={e => handleSubmit(e, 'email', formik.values.email)}>
                            <h3>Update Email</h3>
                            <Field type='email' name='email' />
                            <p><ErrorMessage name='email' /></p>
                        </Form>

                        <Form className={styles.form} onSubmit={e => handleSubmit(e, 'password', formik.values.password)}>
                            <h3>Update Password</h3>
                            <Field type='password' name='password' />
                            <p><ErrorMessage name='password' /></p>

                            <Field type='password' name='confirmPassword' />
                            <p><ErrorMessage name='confirmPassword' /></p>
                        </Form>
                    </>
                )}
            </Formik>

            {/* <form onSubmit={e => handleSubmit2(e)} className={styles.form}>
                <h3>Update Name</h3>
                <input type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />
                <p>{formik.errors.name}</p>
            </form>

            <form onSubmit={e => handleSubmit2(e)} className={styles.form}>
                <h3>Update Email</h3>
                <input type='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
                <p>{formik.errors.email}</p>
            </form>

            <form onSubmit={e => handleSubmit2(e)} className={styles.form}>
                <h3>Update Password</h3>
                <input type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
                <p>{formik.touched.password ? formik.errors.password : null}</p>

                <input type='confirmPassword' name='confirmPassword' onChange={formik.handleChange} value={formik.values.confirmPassword} />
                <p>{formik.touched.confirmPassword ? formik.errors.confirmPassword : null}</p>
            </form> */}

            {/* <Formik
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
                        <Field type='text' name='name' />
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

                    <button type='submit'>Confirm Changes</button>
                </Form>
            </Formik> */}
        </div >
    );
}

export default ProfileSettings;