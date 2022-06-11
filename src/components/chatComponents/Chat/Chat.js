import Moment from 'react-moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/fontawesome-free-solid';
import { useParams, useNavigate } from 'react-router-dom';

import styles from './Chat.module.css';

const snippets = [
    'Snippet 1',
    'Sentence',
    'BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEG word',
    'Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet',
    'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
];

function Chat() {
    /* full of placeholders rn */
    const { id } = useParams();
    const dialog = useSelector(state =>
        state.chatReducer.dialogs.find(dialog => dialog.dialogId === id)
    );
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const addSnippet = snippet => setInput(input + snippet);

    const messages = dialog.messages.map((message, i) => (
        <div key={i} className={`${styles.message} ${styles[message.writtenBy]}`}>
            <p className={styles.text}>{message.content}</p>
            <p>
                <Moment fromNow className={styles.time}>
                    {message.timestamp}
                </Moment>
            </p>
        </div>
    ));

    let rating;
    if (dialog.status === 'completed') {
        if (dialog.rating !== -1) {
            rating = ['goldStar', 'goldStar', 'goldStar', 'goldStar', 'goldStar'];
            for (let i = dialog.rating; i < 5; i++) {
                rating[i] = 'greyStar';
            }
            rating = (
                <div>
                    <h3 className={styles.ratingText}>Your rating: </h3>
                    {rating.map((star, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} className={styles[star]} />
                    ))}
                </div>
            );
        } else {
            rating = <h4>User did not put a rating</h4>;
        }
    }

    /* let isInputActive = true;
    if(dialog.status === 'completed') {
        isInputActive = false;
        setInput("Dialog finished. You can't write here");
    } */

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

            <form className={styles.input}>
                <textarea
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    maxLength="250"
                    className={styles.inputField}
                ></textarea>

                <div className={styles.buttons}>
                    <button
                        type="button"
                        onClick={() => setInput('')}
                        className={`${styles.button} ${styles.clear}`}
                    >
                        Clear
                    </button>
                    <button
                        type="button"
                        onClick={() => alert(input)}
                        className={`${styles.button} ${styles.submit}`}
                    >
                        Send
                    </button>
                </div>
            </form>

            <div className={styles.snippets}>
                <h4>Your snippets</h4>
                <button onClick={() => addSnippet(snippets[0])} className={styles.snippet}>
                    {snippets[0]}
                </button>
                <button onClick={() => addSnippet(snippets[1])} className={styles.snippet}>
                    {snippets[1]}
                </button>
                <button onClick={() => addSnippet(snippets[2])} className={styles.snippet}>
                    {snippets[2]}
                </button>
                <button onClick={() => addSnippet(snippets[3])} className={styles.snippet}>
                    {snippets[3]}
                </button>
                <button onClick={() => addSnippet(snippets[4])} className={styles.snippet}>
                    {snippets[4]}
                </button>
                <button onClick={() => addSnippet(snippets[5])} className={styles.snippet}>
                    {snippets[5]}
                </button>
            </div>
        </div>
    );
}

export default Chat;
