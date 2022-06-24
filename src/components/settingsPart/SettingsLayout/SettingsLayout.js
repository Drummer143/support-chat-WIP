import styles from './SettingsLayout.module.css';
import { Outlet, NavLink } from 'react-router-dom';

function SettingsLayout() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <NavLink to='/settings/profile'>user</NavLink> <br />
                <NavLink to='/settings/dialog'>dialogs</NavLink> <br />
                <NavLink to='/main/dialogs'>xxxxxx</NavLink>
                <Outlet />
            </div>
        </div>
    );
}

export default SettingsLayout;