import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Chat.module.css';
import mapRating from './../../listOfDialogsPart/DialogCell/mapRating';
import Message from '../Message/Message';
import InputForm from '../InputForm/InputForm';

function Chat() {
    /* full of placeholders rn */
    const { id } = useParams();
    const dialog = useSelector(state =>
        state.chatReducer.dialogs.find(dialog => dialog.dialogId == id)
    );
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const addSnippet = snippet => setInput(input + snippet);

    const snippets = [
        'Snippet 1',
        'Sentence',
        'BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEG word',
        'Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
    ];

    const messages = dialog.messages.map((message, i) => <Message message={message} />);

    let rating;
    if (dialog.status === 'completed') {
        rating = mapRating(dialog.rating);
    }

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

            <div className={styles.chat}>
                {messages}
                {messages}
                {messages}
                {messages}
                {messages}
                {messages}
                {messages}
                {messages}
            </div>

            <InputForm input={input} setInput={setInput} />

            <div className={styles.snippets}>
                <h4>Your snippets</h4>
                {snippets.map(snippet => <button onClick={() => addSnippet(snippet)} className={styles.snippet}>{snippet}</button>)}
            </div>
        </div>
    );
}

export default Chat;
