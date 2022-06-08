import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';
import styles from './Navbar.module.css';
import { useDispatch } from 'react-redux';
import { changeStatus } from '../../../redux/actions/actions';

function Navbar(props) {
    const dispatch = useDispatch();
    const handleClick = newStatus => dispatch(changeStatus(newStatus));

    return (
        <div className={styles.wrapper}>
            <div className={styles.cell} onClick={() => handleClick('active')}>
                <p className={styles.heading}>Active</p>
                <FontAwesomeIcon icon={faHourglass} className={styles.icon} />
            </div>

            <div className={styles.cell} onClick={() => handleClick('completed')}>
                <p className={styles.heading}>Completed</p>
                <FontAwesomeIcon icon={faCheck} className={styles.icon} />
            </div>

            <div className={styles.cell} onClick={() => handleClick('saved')}>
                <p className={styles.heading}>Saved</p>
                <FontAwesomeIcon icon={faFloppyDisk} className={styles.icon} />
            </div>
        </div>
    );
}

export default Navbar;
