import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { signOutRequest } from '../../../redux/actions/actions';
import { auth } from './../../../firebase';

import styles from './MainComponent.module.css';

function MainComponent() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);
    const navigate = useNavigate();
    const [token, setToken] = useState();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdToken(true)
                    .then(latestToken => setToken(latestToken))
            } else {
                navigate("/error");
            }
        })
    }, []);

    return (
        <div className={styles.wrapper}>
            <header className={styles.userInfo}>
                <p>{user.email}</p>
                <button
                    onClick={() => {
                        dispatch(signOutRequest());
                    }}
                >
                    Sign Out
                </button>
            </header>

            <aside className={styles.chatMenu}>
                <div className={styles.cell}>
                    <NavLink to='#' className={`${styles.activeChats} ${styles.link}`}>Active</NavLink>
                </div>
                <div className={styles.cell}>
                    <NavLink to='#' className={`${styles.completedChats} ${styles.link}`}>Completed</NavLink>
                </div>
                <div className={styles.cell}>
                    <NavLink to='#' className={`${styles.savedChats} ${styles.link}`}>Saved</NavLink>
                </div>
            </aside>

            <div className={styles.chatBody}>
                chatBody
            </div>
        </div>
    );
}

export default MainComponent;