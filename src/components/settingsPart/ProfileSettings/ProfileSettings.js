import styles from './ProfileSettings.module.css';

function ProfileSettings() {

    return (
        <div>
            <form className={styles.wrapper}>
                <h4>Update name</h4>
                <input className={styles.inputField}></input>
            </form>

            <form className={styles.wrapper}>
                <h4>Update email</h4>
                <input className={styles.inputField}></input>
            </form>

            <form className={styles.wrapper}>
                <h4>Update password</h4>
                <input className={styles.inputField}></input>
                <input className={styles.inputField}></input>
            </form>
        </div>
    );
}

export default ProfileSettings;