
import styles from './DialogSettings.module.css';
import { useState, useEffect } from 'react';

function DialogSettings() {
    let snippets = [
        'Snippet 1',
        'Sentence',
        'BEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEG word',
        'Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet',
        'Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet Snippet'
    ];

    const changeInput = id => {
        const block = document.getElementById(id);
        block.children[0].disabled = !block.children[0].disabled;
        block.children[1].textContent = block.children[0].disabled ? 'Update' : 'Save updates';
        block.children[2].disabled = !block.children[2].disabled;
    };

    const fields = snippets.map((snippet, i) => (
        <div id={i}>
            <input type='text' value={snippet} disabled={true} />
            <button onClick={() => changeInput(i)}>Update</button>
            <button>Delete</button>
        </div>
    ));

    return (
        <div className={styles.wrapper}>
            <h4>Your prepared phrases</h4>
            <p>automatic greeting</p>
            {fields}
        </div>
    );
}

export default DialogSettings;