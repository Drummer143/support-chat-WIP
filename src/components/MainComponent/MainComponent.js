import { useDispatch } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

import { signOutRequest } from '../../redux/actions/actions';
import { auth } from './../../firebase';

import styles from './MainComponent.module.css';

function MainComponent() {
    const dispatch = useDispatch();
    const [user] = useAuthState(auth);

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