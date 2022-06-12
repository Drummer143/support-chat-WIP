import { debounce } from 'lodash';

import styles from './SearchBar.module.css';

function SearchBar(props) {
    return (
        <div>
            <input
                type="text"
                onChange={e => props.setValue(e.target.value)}
                value={props.value}
                placeholder="type here to search..."
                className={styles.input}
            ></input>
        </div>
    );
}

export default SearchBar;
