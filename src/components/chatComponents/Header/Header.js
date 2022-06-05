import { useDispatch, useSelector } from 'react-redux';

import SearchBar from '../SearchBar/SearchBar';
import { signOutRequest } from './../../../redux/actions/actions';

import styles from './Header.module.css';

function Header(props) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.authReducer.user);

    return (
        <div className={styles.wrapper}>
            <SearchBar value={props.searchParams} setValue={props.setSearchParams} />

            <div className={styles.rightPart}>
                <div className={styles.info}>
                    <p className={styles.email}>{user.email}</p>
                </div>

                <button className={styles.button}
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