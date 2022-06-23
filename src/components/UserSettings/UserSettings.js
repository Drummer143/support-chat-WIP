import styles from './UserSettings.module.css';

function UserSettings({ visibility, setVisibility }) {
    const closeSettings = target => {
        if (target === document.getElementById('settings')) {
            setVisibility('none');
        }
    };

    return (
        <div style={{ display: visibility }} onClick={e => closeSettings(e.target)} className={styles.wrapper} id='settings'>
            <div className={styles.body}>
                sadsada
                <button onClick={() => setVisibility('none')}>X</button>
            </div>
        </div>
    );
}

export default UserSettings;