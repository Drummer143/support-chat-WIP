import { useDispatch, useSelector } from 'react-redux';

import { signOutRequest } from './../../redux/actions/actions';

import styles from './Header.module.css';

function Header({ setVisibility }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    return (
        <div className={styles.wrapper}>
            <button className={styles.info} onClick={() => setVisibility('initial')}>
                <p>{user.email}</p>
            </button>

            <button
                className={styles.button}
                onClick={() => {
                    dispatch(signOutRequest());
                }}
            >
                Sign Out
            </button>
        </div>
    );
}

export default Header;
