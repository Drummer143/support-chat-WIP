import { useState } from 'react';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import styles from './Chat.module.css';

function Chat() {
    const { id } = useParams();
    const dialog = useSelector(state => state.chatReducer.dialogs.find(dialog => dialog.dialogId == id));
    const [ input, setInput ] = useState('');
    const addSnippet = snippet => setInput(input + snippet);
    const messages = dialog.messages.map(message => (
        <div className={`${styles.message} ${styles[message.writtenBy]}`}>
            <p className={styles.text}>{message.content}</p>
            <p><Moment fromNow className={styles.time}>{message.timestamp}</Moment></p>
        </div>)
    );

    const snippets = [
        'Snippet 1',
        'Sentence',
        'BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEG word',
        'Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet',
    ]

    console.log(dialog)

    return (
        <div className={styles.wrapper}>
            <div className={styles.userInfo}><h3>{dialog.userName}</h3></div>

            <div className={styles.mark}>

            </div>

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
                <textarea value={input} onChange={e => setInput(e.target.value)} className={styles.inputField}></textarea>

                <div className={styles.buttons}>
                    <button type='reset' onClick={() => setInput('')} className={`${styles.button} ${styles.clear}`}>Clear</button>
                    <button type='button' onClick={() => alert(input)} className={`${styles.button} ${styles.submit}`}>Send</button>
                </div>
            </form>

            <div className={styles.snippets}>
                <h4>Your snippets</h4>
                <button onClick={() => addSnippet(snippets[0])} className={styles.snippet}>{snippets[0]}</button>
                <button onClick={() => addSnippet(snippets[1])} className={styles.snippet}>{snippets[1]}</button>
                <button onClick={() => addSnippet(snippets[2])} className={styles.snippet}>{snippets[2]}</button>
                <button onClick={() => addSnippet(snippets[3])} className={styles.snippet}>{snippets[3]}</button>
                <button onClick={() => addSnippet(snippets[4])} className={styles.snippet}>{snippets[4]}</button>
                <button onClick={() => addSnippet(snippets[5])} className={styles.snippet}>{snippets[5]}</button>
            </div>
        </div>
    );
}

export default Chat;