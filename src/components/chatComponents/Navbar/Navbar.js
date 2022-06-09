import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/fontawesome-free-solid';
import { faFloppyDisk, faHourglass } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeStatus } from '../../../redux/actions/actions';

import styles from './Navbar.module.css';

const Cell = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changeStatus(props.status));
        navigate('/main/dialogs')
    }
    
    return (
        <div className={styles.cell} onClick={() => handleClick(props.status)}>
            <p className={styles.heading}>{props.text}</p>
            <FontAwesomeIcon icon={props.icon} className={styles.icon} />
        </div>
    )
}

function Navbar() {
    return (
        <div className={styles.wrapper}>
            <Cell status='active' icon={faHourglass} text='Active' />
            <Cell status='completed' icon={faCheck} text='Completed' />
            <Cell status='saved' icon={faFloppyDisk} text='Saved' />
        </div>
    );
}

export default Navbar;
