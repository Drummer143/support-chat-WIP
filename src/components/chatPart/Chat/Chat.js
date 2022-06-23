import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Chat.module.css';
import mapRating from './../../listOfDialogsPart/DialogCell/mapRating';
import Message from '../Message/Message';
import InputForm from '../InputForm/InputForm';
import SnippetPanel from '../SnippetPanel/SnippetPanel';

function Chat() {
    /* full of placeholders rn */
    const { id } = useParams();
    const navigate = useNavigate();
    const dialog = useSelector(state =>
        state.chatReducer.dialogs.find(dialog => dialog.dialogId == id)
    );
    const [input, setInput] = useState('');

    const addSnippet = snippet => setInput(input + snippet);

    const messages = dialog.messages.map((message, i) => <Message message={message} />);

    let rating;
    if (dialog.status === 'completed') {
        rating = mapRating(dialog.rating);
    }

    useEffect(() => {
        const block = document.getElementById('chat');
        block.scrollTop = block.scrollHeight;
    });

    return (
        <div className={styles.wrapper}>
            <button
                type="button"
                onClick={() => navigate('/main/dialogs')}
                className={styles.back}
                data-title="Go to main page"
            >
                <FontAwesomeIcon icon={faArrowLeft} className={styles.icon} />
            </button>

            <div className={styles.userInfo}>
                <h3>{dialog.userName}</h3>
            </div>

            <div className={styles.rating}>{rating}</div>

            <div className={styles.chat} id="chat">
                {messages}
                {dialog.status === 'completed' ? (
                    <div className={styles.lastMessage}>
                        Dialog is closed. You can only read the messages.
                    </div>
                ) : null}
            </div>

            <InputForm
                input={input}
                setInput={setInput}
                id={messages.length}
                dialogId={dialog.dialogId}
                status={dialog.status}
            />

            <SnippetPanel addSnippet={addSnippet} />
        </div>
    );
}

export default Chat;
