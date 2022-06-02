import { useState } from 'react';

import styles from './SearchBar.module.css';

function SearchBar(props) {

    return (
        <div className={styles.wrapper}>
            <input type='text' onChange={event => props.setValue(event.target.value)} value={props.value} placeholder='type here to search...'></input>
        </div>
    );
}



export default SearchBar;