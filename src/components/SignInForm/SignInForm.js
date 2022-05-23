import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import styles from "./SignInForm.module.css";
import { useDispatch } from 'react-redux';
import { signInRequest } from "../../redux/actions/actions";
import * as Yup from 'yup';

/* const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address.\nExample: example@mail.com';
    }

    if (!values.password) {
        errors.password = 'Required';
    }

    return errors;
} */

function SignInForm() {
    const dispatch = useDispatch();

    /* const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => { alert(JSON.stringify(values, null, 2)); dispatch(signInRequest(values)) }
    }); */
    
    return (
        <div className={ styles.wrapper }>
            <h1 className={styles.heading}>Sign In</h1>

            <Formik 
                initialValues={{ email: '', password: '', }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email("Invalid email address. Example: suppurt-chat@example.com").required("Required"),
                    password: Yup.string().min(6, 'Must be 6 characters or more').max(20, 'Must be 20 characters or less').required("Required")
                })} 
                onSubmit={ values => { alert(JSON.stringify(values, null, 2)); dispatch(signInRequest(values)) }}
            >
                <Form className={styles.form}>
                    <div className={styles.input}>
                        <Field name='email' type='text' placeholder='email' className={styles.inputField}></Field>
                        <div className={styles.error}>
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className={styles.input}>
                        <Field name='password' type='password' placeholder='password' className={styles.inputField}></Field>
                        <div className={styles.error}>
                            <ErrorMessage name="password" />
                        </div>
                    </div>

                    <button type='submit' className={styles.button}>Sign In</button>
                </Form>
            </Formik>

            {/* <form className={styles.form} onSubmit={formik.handleSubmit}>
                <div className={styles.input}>
                    <input name="email" 
                           type="text" 
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur} 
                           value={formik.values.email} 
                           placeholder="Email" 
                           className={styles.inputField} 
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <div className={styles.error}>{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className={styles.input}>
                    <input name="password" 
                           type="password" 
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur} 
                           value={formik.values.password} 
                           placeholder="Password" 
                           className={styles.inputField} 
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                </div>

                <button type='submit' className={styles.button}>Sign In</button>
            </form> */}
        </div>
    );
}

export default SignInForm;