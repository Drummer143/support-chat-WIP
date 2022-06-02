import { useState } from 'react';

import styles from './SearchBar.module.css';

function SearchBar(props) {

    return (
        <div>
            <input 
                type='text' 
                onChange={event => props.setValue(event.target.value)} 
                value={props.value}
                placeholder='type here to search...' 
                className={styles.input}
            ></input>
        </div>
    );
}



export default SearchBar;