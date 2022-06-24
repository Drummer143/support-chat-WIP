import mapRating from './mapRating';

import Button from './../Button/Button';

import styles from './DialogCell.module.css';

const useButtons = ({ dialogId, status, saved, rating }) => {
    if (status === 'completed') {
        rating = mapRating(rating);
    }

    const buttons = {
        complete: (
            <Button
                dialogId={dialogId}
                btnColor="complete"
                newStatus="complete"
                path="status"
                text="Complete dialog"
            />
        ),
        save: (
            <Button
                dialogId={dialogId}
                btnColor="save"
                newStatus={true}
                path="saved"
                text="Save dialog"
            />
        ),
        deleteFromSaved: (
            <Button
                dialogId={dialogId}
                btnColor="delete"
                newStatus={false}
                path="saved"
                text="Delete from saved"
            />
        ),
        enterDialog: (
            <Button
                dialogId={dialogId}
                btnColor="accept"
                newStatus="active"
                path="status"
                text="Accept dialog"
            />
        )
    };

    switch (status) {
        case 'active': {
            return {
                first: buttons.complete,
                second: saved ? buttons.deleteFromSaved : buttons.save
            };
        }
        case 'completed': {
            return {
                first: <div className={`${styles.button} ${styles.rating}`}>{rating}</div>,
                second: saved ? buttons.deleteFromSaved : buttons.save
            };
        }
        case 'queue': {
            return {
                first: buttons.enterDialog,
                second: ''
            };
        }

        default: {
            return {
                first: '',
                second: ''
            };
        }
    }
};

export default useButtons;
