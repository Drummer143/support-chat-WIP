import styles from './SearchBar.module.css';

function SearchBar({value, setValue}) {
    return (
        <div>
            <input
                type="text"
                onChange={e => setValue(e.target.value)}
                value={value}
                placeholder="type here to search..."
                className={styles.input}
            ></input>
        </div>
    );
}

export default SearchBar;
