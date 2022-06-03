import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';

import Body from '../Body/Body';

import styles from './MainPage.module.css';
import Header from './../Header/Header';
import Navbar from '../Navbar/Navbar';

function MainPage() {
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [searchParams, setSearchParams] = useState('');
    const [statusKey, setStatusKey] = useState('');

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
                <Header searchParams={searchParams} setSearchParams={setSearchParams} />
            </header>

            <aside className={styles.navbar}>
                <Navbar statusKey={statusKey} setStatusKey={setStatusKey} />
            </aside>

            <div className={styles.Body}>
                <Body searchParams={searchParams} statusKey={statusKey} />
            </div>
        </div>
    );
}

export default MainPage;