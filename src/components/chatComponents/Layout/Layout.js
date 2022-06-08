import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';

import styles from './Layout.module.css';
import Header from './../Header/Header';
import Navbar from '../Navbar/Navbar';

function Layout() {
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [statusKey, setStatusKey] = useState('active');

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken(true).then((latestToken) => setToken(latestToken));
            } else {
                navigate('/error');
            }
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header />
            </header>

            <aside className={styles.navbar}>
                <Navbar statusKey={statusKey} setStatusKey={setStatusKey} />
            </aside>

            <div className={styles.Body}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;