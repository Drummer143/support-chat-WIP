import { Outlet, NavLink } from 'react-router-dom';

import ButtonHome from '../../ButtonHome/ButtonHome';

import styles from './SettingsLayout.module.css';

function SettingsLayout() {
    const setStyles = isActive => {
        if (isActive) {
            return `${styles.link} ${styles.active}`;
        } else {
            return `${styles.link}`;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <ButtonHome />
                <NavLink to='/settings/profile' className={({ isActive }) => setStyles(isActive)}><p>profile</p></NavLink>
                <NavLink to='/settings/dialog' className={({ isActive }) => setStyles(isActive)}><p>dialogs</p></NavLink>
            </div>

            <div className={styles.body}>
                <Outlet />
            </div>
        </div >
    );
}

export default SettingsLayout;