import Moment from 'react-moment';
import { ref } from 'firebase/database';
import { update } from 'firebase/database';
import { faStar } from '@fortawesome/fontawesome-free-solid';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { database } from '../../../firebase';

import styles from './DialogListCell.module.css';

function DialogListCell(props) {
    const lastMessage = props.dialog.messages[props.dialog.messages.length - 1];
    const headDB = ref(database);

    let rating;
    if (props.dialog.rating) {
        if (props.dialog.rating !== -1) {
            rating = ['goldStar', 'goldStar', 'goldStar', 'goldStar', 'goldStar'];
            for (let i = props.dialog.rating; i < 5; i++) {
                rating[i] = 'greyStar';
            }
            rating = rating.map((star, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className={styles[star]} />
            ));
        } else {
            rating = <p>User did not put a rating</p>;
        }
    } else {
        rating = <p>User did not put a rating</p>;
    }

    const setNewStatus = (dialogId, newStatus, path) => {
        let updates = {};
        updates[`/dialogs/${dialogId}/${path}/`] = newStatus;
        update(headDB, updates);
    };

    const enterDialog = () => {
        alert('WIP rn');
    };

    const buttons = {
        complete: (
            <button
                className={`${styles.button} ${styles.complete}`}
                onClick={() => setNewStatus(props.dialog.dialogId, 'completed', 'status')}
            >
                Complete dialog
            </button>
        ),
        save: (
            <button
                className={`${styles.button} ${styles.save}`}
                onClick={() => setNewStatus(props.dialog.dialogId, true, 'saved')}
            >
                Save dialog
            </button>
        ),
        deleteFromSaved: (
            <button
                className={`${styles.button} ${styles.delete}`}
                onClick={() => setNewStatus(props.dialog.dialogId, false, 'saved')}
            >
                Delete from saved
            </button>
        ),
        enterDialog: <button className={`${styles.button} ${styles.enter}`} onClick={() => enterDialog()}>Enter dialog</button>,
        rating: <div className={`${styles.button} ${styles.rating}`}>{rating}</div>,
        placeholder: <div className={styles.placeholder}></div>
    };

    let currButtonSet;
    switch (props.dialog.status) {
        case 'active': {
            currButtonSet = {
                first: buttons.complete,
                second: props.dialog.saved ? buttons.deleteFromSaved : buttons.save
            };
            break;
        }
        case 'completed': {
            currButtonSet = {
                first: buttons.rating,
                second: props.dialog.saved ? buttons.deleteFromSaved : buttons.save
            };
            break;
        }
        case 'saved': {
            currButtonSet = {
                first: props.dialog.rating ? buttons.rating : buttons.placeholder,
                second: buttons.deleteFromSaved
            };
            break;
        }
        case 'queue': {
            currButtonSet = {
                first: buttons.placeholder,
                second: buttons.enterDialog
            };
            break;
        }

        default: {
            currButtonSet = {
                first: buttons.placeholder,
                second: buttons.placeholder
            };
        }
    }

    return (
        <div className={styles.wrapper}>
            <NavLink to={'/main/dialog/' + props.dialog.dialogId} className={styles.dialogInfo}>
                <div className={styles.head}>
                    <p className={styles.text}>{props.dialog.userName}</p>
                    <p className={styles.text}>
                        Last message was sent{' '}
                        <Moment fromNow className={styles.time}>
                            {props.dialog.messages[props.dialog.messages.length - 1].timestamp}
                        </Moment>
                    </p>
                </div>

                <p className={styles.message}>
                    <strong>{lastMessage.writtenBy}:</strong> {lastMessage.content}
                </p>
            </NavLink>

            <div className={styles.buttons}>
                {currButtonSet.first}
                {currButtonSet.second}
            </div>
        </div>
    );
}

export default DialogListCell;
