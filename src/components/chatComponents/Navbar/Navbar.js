import { NavLink } from 'react-router-dom';

import styles from './Navbar.module.css';

function Navbar() {
    return (
        <div className={styles.wrapper}>
            <NavLink to="#" className={styles.cell}>
                <p className={styles.heading}>Active</p>
            </NavLink>

            <NavLink to="#" className={styles.cell}>
                <p className={styles.heading}>Completed</p>
            </NavLink>

            <NavLink to="#" className={styles.cell}>
                <p className={styles.heading}>Saved</p>
            </NavLink>
        </div>
    );
}

export default Navbar;