import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';

function Navbar(props) {
    return (
        <div className={styles.wrapper}>
            <div to="#" className={styles.cell} onClick={() => props.setStatusKey("active")}>
                <p className={styles.heading}>Active</p>
                <FontAwesomeIcon icon={faHourglass} className={styles.icon}/>
            </div>

            <div to="#" className={styles.cell} onClick={() => props.setStatusKey("completed")}>
                <p className={styles.heading}>Completed</p>
                <FontAwesomeIcon icon={faCheck} className={styles.icon}/>
            </div>

            <div to="#" className={styles.cell} onClick={() => props.setStatusKey("saved")}>
                <p className={styles.heading}>Saved</p>
                <FontAwesomeIcon icon={faFloppyDisk} className={styles.icon}/>
            </div>
        </div>
    );
}

export default Navbar;