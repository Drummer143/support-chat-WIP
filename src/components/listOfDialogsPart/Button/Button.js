import { ref } from 'firebase/database';
import { update } from 'firebase/database';

import { database } from '../../../firebase';

import styles from './Button.module.css';

const Button = props => {
    const headDB = ref(database);

    const setNewStatus = (dialogId, newStatus, path) => {
        let updates = {};
        updates[`/dialogs/${dialogId}/${path}/`] = newStatus;
        update(headDB, updates);
        /* TODO: update operatorId */
    };

    return (
        <button
            className={`${styles.button} ${styles[props.btnColor]}`}
            onClick={() => setNewStatus(props.dialogId, props.newStatus, props.path)}
        >
            {props.text}
        </button>
    );
};

export default Button;
