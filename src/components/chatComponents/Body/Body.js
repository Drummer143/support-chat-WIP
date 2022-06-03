import DialogListCell from '../DialogListCell/DialogListCell';
import { dialogs } from './../../../data';

import styles from './Body.module.css';

const findChats = (dialog, searchParams) => {
    if (dialog.userName.toLowerCase().includes(searchParams.toLowerCase())) {
        return true;
    }
    return dialog.messages.find(message => message.content.toLowerCase().includes(searchParams.toLowerCase()));
}

function Body(props) {
    let results = dialogs
        .filter(dialog => findChats(dialog, props.searchParams) && props.statusKey == dialog.status)
        .map(dialog => <DialogListCell dialog={dialog} />);
    if (!results[0]) {
        results = <p className={styles.empty}>The list of available chats is empty.
            Select another folder to the left of the list and also change the search terms.
            Or just wait for new chats to appear.
        </p>;
    }

    return (
        <div className={styles.wrapper}>
            {results}
        </div>
    );
}

export default Body;