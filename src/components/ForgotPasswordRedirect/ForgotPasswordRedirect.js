import React from 'react';

import styles from './ForgotPasswordRedirect.module.css';

function ForgotPasswordRedirect() {
    return (
        <div className={styles.wrapper}>
            <p>Check your email and follow the link we sent to restore your account password</p>
            <p>
                It may take several minutes to deliver it. And don't forget to check the spam
                folders
            </p>
            <p>
                Go to{' '}
                <a href="/" className={styles.link}>
                    login
                </a>{' '}
                page
            </p>
        </div>
    );
}

export default ForgotPasswordRedirect;
