import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';

import { changeStatus } from '../../../redux/actions/actions';

import styles from './Navbar.module.css';

const Cell = ({status, icon, text}) => {
    const currStatus = useSelector(state => state.chatReducer.status);
    const dispatch = useDispatch();

    let style = styles.cell;
    if (currStatus === status) {
        style = `${style} ${styles.active}`;
    }

    const handleClick = () => {
        if (currStatus !== status) {
            dispatch(changeStatus(status));
        }
    };

    return (
        <div className={style} onClick={() => handleClick(status)}>
            <p className={styles.heading}>{text}</p>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
};

function Navbar() {
    return (
        <div className={styles.wrapper}>
            <Cell status="active" icon={faHourglass} text="Active" />
            <Cell status="completed" icon={faCheck} text="Completed" />
            <Cell status="saved" icon={faFloppyDisk} text="Saved" />
        </div>
    );
}

export default Navbar;
