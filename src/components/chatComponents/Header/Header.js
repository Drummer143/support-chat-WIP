import { useDispatch, useSelector } from 'react-redux';

import { signOutRequest } from './../../../redux/actions/actions';

import styles from './Header.module.css';

function Header() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    return (
        <div className={styles.wrapper}>
            <div className={styles.rightPart}>
                <div className={styles.info}>
                    <p className={styles.email}>{user.email}</p>
                </div>

                <button
                    className={styles.button}
                    onClick={() => {
                        dispatch(signOutRequest());
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default Header;
