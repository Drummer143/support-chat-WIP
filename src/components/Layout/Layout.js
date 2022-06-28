import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from './../Header/Header';
import Navbar from './../Navbar/Navbar';
import useLoadDialogs from './useLoadDialogs';
import { auth } from '../../firebase';

import styles from './Layout.module.css';

function Layout() {
    const navigate = useNavigate();
    /* const [token, setToken] = useState(); */
    const { pathname } = useLocation();

    useLoadDialogs();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (!user) {
                /*  user.getIdToken(true).then(latestToken => setToken(latestToken));
             } else { */
                navigate('/error');
            }

            if (pathname === '/main' || pathname === '/main/') {
                navigate('/main/dialogs');
            }
        });
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <Header />
            </header>

            <aside className={styles.navbar}>
                <Navbar />
            </aside>

            <div className={styles.body}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
