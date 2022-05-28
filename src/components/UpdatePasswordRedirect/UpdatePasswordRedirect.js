import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './UpdatePasswordRedirect.module.css';

function UpdatePasswordRedirect() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => navigate('/'), 10000);
    });

    return (
        <div className={styles.wrapper}>
            <p>Your password has been successfully changed</p>
            <p>You will be redirected to authentication page soon</p>
        </div>
    );
}

export default UpdatePasswordRedirect;
